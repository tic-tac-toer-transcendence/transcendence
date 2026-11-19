package api

import (
	"log"
	"net/http"

	"tac-backend/internal/game"

	"github.com/gin-gonic/gin"
)

func sendMove(r *room, player game.Owner, field, cell int) (over bool, winner game.Owner) {
	for _, conn := range r.conns {
		conn.WriteJSON(gin.H{"type": "move", "player": player, "field": field, "cell": cell})
	}
	over, winner = r.g.Result()
	if over {
		r.done = true
		for _, conn := range r.conns {
			conn.WriteJSON(gin.H{"type": "game_over", "winner": winner})
			conn.Close()
		}
	}
	return over, winner
}

func botTurn(r *room) (over bool, winner game.Owner) {
	if r.bot == game.Ownerless || r.g.CurrentPlayer() != r.bot {
		return false, game.Ownerless
	}
	field, cell := r.g.AIGetMove()
	if err := r.g.MakeMove(r.bot, field, cell); err != nil {
		log.Println("bot made an illegal move:", err)
		return false, game.Ownerless
	}
	return sendMove(r, r.bot, field, cell)
}

type moveMsg struct {
	Type  string `json:"type"`
	Field int    `json:"field"`
	Cell  int    `json:"cell"`
}

func GameSocketHandler(c *gin.Context) {
	userID := c.MustGet("userID").(string)
	gameID := c.Param("id")

	//find if user player in game
	rooms.mu.Lock()
	r := rooms.byID[gameID]
	rooms.mu.Unlock()
	if r == nil {
		respondError(c, http.StatusNotFound, "game_not_found", nil)
		return
	}

	r.mu.Lock()
	symbol, ok := r.players[userID]
	r.mu.Unlock()
	if !ok {
		respondError(c, http.StatusForbidden, "not_your_game", nil)
		return
	}

	//websock

	con, err := upgradeWebsocket.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer con.Close()

	//finish step
	r.mu.Lock()
	r.conns[userID] = con
	con.WriteJSON(gin.H{"type": "joined", "you": symbol, "turn": r.g.CurrentPlayer()})
	r.mu.Unlock()

	//leaving
	defer func() {
		r.mu.Lock()
		delete(r.conns, userID)
		r.mu.Unlock()
		playerLeft(gameID, r, userID)
	}()

	for { //* FRONTEND SEND {"type":"move","field":4,"cell":0}
		var msg moveMsg
		if err := con.ReadJSON(&msg); err != nil {
			return //any garbage also closing tab falls withing same categoriy
		}

		r.mu.Lock()
		if err := r.g.MakeMove(symbol, msg.Field, msg.Cell); err != nil {
			con.WriteJSON(gin.H{"type": "error", "error": err.Error()})
			r.mu.Unlock()
			continue
		}

		over, winner := sendMove(r, symbol, msg.Field, msg.Cell)
		if !over {
			over, winner = botTurn(r)
		}
		r.mu.Unlock()

		if over {
			endGame(gameID, r, winner)
			return
		}
	}

}

//*board approx look when X plays middle, cell 0 (first)
/*
! board:   state of board (X placed 0 in middle first, rest empty)
! next:    field 0   ← because X played cell 0
! current: Circle    ← O's turn now
! turn:    1
! winner:  Ownerless
! over:    false


*/

/* Accepting the game

Rules:
* you can only invie people who are live, and not busy (in game, or waiting for one)
* one invite per user at a time
* pending requests live in memory, not in DB

!The flow:
*Maja clicks Bob -> POST /invites bob
* server checks Bob (busy, online) -> "Not online, try later"
* 30 secs - 2min timer starts for bob to Join - Maja goes to waiting lobby
*Bob gets push over presence ws "Maja invites you - accept, decline"
*Bob accepts -> POST /invites/accept
!decision who is X and who O
!who starts first at random
!CreateGame
!.NewGame()....

*Bob declines, timer runs out-> Maja gets "declined" or "no answer" - automatically
*.                                                                      exits lobby

!Maja or Bob disconnects while waiting - invite canceled, other party messaged

*should you be friends to play together - I say yes, makes more sense- cannot send play request
* must first send Friends reequest and be in status of friends




!POSSIBLE PROBLEMS
1. Two tabs. Maja is in the game and right-clicks the tab → "Duplicate", or copies the address into a new tab. Now two tabs are in the same game. If she closes one, the server thinks she left and she loses. It's rare, but someone will do it by accident, and an evaluator may do it on purpose.

2. Nobody opens the game. Your flow says both are sent to the game automatically. That step happens in the browser, though. If Maja's laptop goes to sleep or her wifi drops in that second, her browser never arrives. The server keeps waiting forever, and both stay "busy".

3. Move before the other arrives. Both are sent at the same moment, but one page loads faster. If Bob's internet is slow, Maja can be on the board a few seconds before him. If she moves in that gap, Bob misses it.
4. register ignores a hashing error.

add GET/me later (when refreshed page happens and server forgers)
*/
