package api

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"

	"tac-backend/database"
)

type invite struct {
	from  string
	to    string
	timer *time.Timer
}

type inviteHub struct {
	mu     sync.Mutex
	byUser map[string]*invite
}

var invites = &inviteHub{
	byUser: map[string]*invite{},
}

func removeInvite(inv *invite) {
	inv.timer.Stop()
	delete(invites.byUser, inv.from)
	delete(invites.byUser, inv.to)
}

func CreateInviteHandler(c *gin.Context) {
	from := c.MustGet("userID").(string)

	var req struct {
		To string `json:"to" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		respondError(c, http.StatusBadRequest, "validation_fail", err)
		return
	}

	to := req.To

	if to == from {
		respondError(c, http.StatusBadRequest, "cannot_invite_self", nil)
		return
	}
	if !IsOnline(to) {
		respondError(c, http.StatusConflict, "user_offline", nil)
		return
	}
	if inGame(from) || inGame(to) {
		respondError(c, http.StatusConflict, "user_busy", nil)
		return
	}

	var sender database.User
	if err := database.DB.First(&sender, "id = ?", from).Error; err != nil {
		respondError(c, http.StatusInternalServerError, "server_error", err)
		return
	}

	invites.mu.Lock()
	if invites.byUser[from] != nil || invites.byUser[to] != nil {
		invites.mu.Unlock()
		respondError(c, http.StatusConflict, "user_busy", nil)
		return
	}
	inv := &invite{from: from, to: to}
	inv.timer = time.AfterFunc(30*time.Second, func() { expireInvite(inv) })
	invites.byUser[from] = inv
	invites.byUser[to] = inv
	invites.mu.Unlock()

	notifyUser(to, gin.H{"type": "game_invite", "fromUser": from, "username": sender.Username})
	respondOK(c, http.StatusCreated, gin.H{"status": "invite_sent"})
}

func AcceptInviteHandler(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	// 1. find invite and remove it
	invites.mu.Lock()
	inv := invites.byUser[userID]
	if inv == nil || inv.to != userID {
		invites.mu.Unlock()
		respondError(c, http.StatusNotFound, "no_invite", nil)
		return
	}
	removeInvite(inv)
	invites.mu.Unlock()

	// 2. create the game
	gameID, err := createRoom(inv.from, inv.to)
	if err != nil {
		notifyUser(inv.from, gin.H{"type": "invite_failed"})
		respondError(c, http.StatusInternalServerError, "server_error", err)
		return
	}

	// 3. tell both: go to the game
	start := gin.H{"type": "game_start", "gameId": gameID}
	notifyUser(inv.from, start)
	notifyUser(inv.to, start)
	respondOK(c, http.StatusOK, gin.H{"gameId": gameID})
}

func DeclineInviteHandler(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	invites.mu.Lock()
	inv := invites.byUser[userID]
	if inv == nil {
		invites.mu.Unlock()
		respondError(c, http.StatusNotFound, "no_invite", nil)
		return
	}
	removeInvite(inv)
	invites.mu.Unlock()

	if userID == inv.to {
		notifyUser(inv.from, gin.H{"type": "invite_declined"})
	} else {
		notifyUser(inv.to, gin.H{"type": "invite_cancelled"})
	}
	respondOK(c, http.StatusOK, gin.H{"status": "ok"})
}

func cancelInvite(userID string) {
	invites.mu.Lock()
	inv := invites.byUser[userID]
	if inv == nil {
		invites.mu.Unlock()
		return // no invite
	}
	removeInvite(inv)
	invites.mu.Unlock()

	other := inv.from
	if userID == inv.from {
		other = inv.to
	}
	notifyUser(other, gin.H{"type": "invite_cancelled"})
}

func expireInvite(inv *invite) {
	invites.mu.Lock()
	if invites.byUser[inv.from] != inv {
		invites.mu.Unlock()
		return
	}
	removeInvite(inv)
	invites.mu.Unlock()

	msg := gin.H{"type": "invite_expired"}
	notifyUser(inv.from, msg)
	notifyUser(inv.to, msg)
}
