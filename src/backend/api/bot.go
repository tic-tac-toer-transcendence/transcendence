package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func BotGameHandler(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	if inGame(userID) {
		respondError(c, http.StatusConflict, "user_busy", nil)
		return
	}

	invites.mu.Lock()
	hasInvite := invites.byUser[userID] != nil
	invites.mu.Unlock()

	if hasInvite {
		respondError(c, http.StatusConflict, "user_busy", nil)
		return
	}

	gameID, err := createBotRoom(userID)
	if err != nil {
		respondError(c, http.StatusInternalServerError, "server_error", err)
		return
	}
	respondOK(c, http.StatusCreated, gin.H{"gameId": gameID})
}
