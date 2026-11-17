package api

import (
	"log"
	"math/rand/v2"
	"sync"

	"tac-backend/database"
	"tac-backend/internal/game"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type room struct {
	mu      sync.Mutex                 //2 websockets (2 players) accessing
	g       *game.Game                 //game object or whatever will be called
	players map[string]game.Owner      //cross or circle for both (I use Owner type)
	conns   map[string]*websocket.Conn //websocket connections
	bot     game.Owner                 //when its human v AI
	done    bool
}

type roomHub struct { //ALL ROOMS
	mu   sync.Mutex
	byID map[string]*room // "room_name: <room>"
}

var rooms = &roomHub{ //we need to create empty list of rooms (roomHub) at start of server
	byID: map[string]*room{},
}

func endGame(gameID string, r *room, winner game.Owner) {
	var winnerID *string
	for userID, symbol := range r.players {
		if symbol == winner {
			winnerID = &userID
		}
	}

	if err := database.FinishGame(gameID, winnerID); err != nil {
		log.Println("could not save game result:", err)
	}

	rooms.mu.Lock()
	delete(rooms.byID, gameID)
	rooms.mu.Unlock()
}

func createRoom(player1ID, player2ID string) (string, error) {

	first := game.Cross
	if rand.IntN(2) == 1 {
		first = game.Circle
	}

	g, err := game.NewGame(first)
	if err != nil {
		return "", err
	}

	gameID, err := database.CreateGame(player1ID, player2ID, "X", "O") //*add later preffered
	if err != nil {
		return "", err
	}

	rooms.mu.Lock()
	rooms.byID[gameID] = &room{
		g:       g,
		players: map[string]game.Owner{player1ID: game.Cross, player2ID: game.Circle},
		conns:   map[string]*websocket.Conn{},
		bot:     game.Ownerless,
	}
	rooms.mu.Unlock()

	return gameID, nil
}

func playerLeft(gameID string, r *room, leaverID string) {
	r.mu.Lock()
	if r.done {
		r.mu.Unlock()
		return // game already ended, this is just the normal close
	}
	r.done = true

	var winner game.Owner
	for userID, symbol := range r.players {
		if userID != leaverID {
			winner = symbol
		}
	}
	for _, conn := range r.conns {
		conn.WriteJSON(gin.H{"type": "game_over", "winner": winner, "reason": "opponent_left"})
		conn.Close()
	}
	r.mu.Unlock()

	endGame(gameID, r, winner)
}

func inGame(userID string) bool {
	rooms.mu.Lock()
	defer rooms.mu.Unlock()

	for _, r := range rooms.byID {
		if _, ok := r.players[userID]; ok {
			return true
		}
	}
	return false
}
