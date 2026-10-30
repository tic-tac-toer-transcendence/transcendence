package api

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgradeWebsocket = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { //! in production restrict to our site url
		return true
	},
}

type presenceHub struct {
	mu    sync.Mutex
	users map[string]*websocket.Conn
}

var presence = &presenceHub{
	users: map[string]*websocket.Conn{},
}

func PresenceHandlerWS(c *gin.Context) {
	userID := c.MustGet("userID").(string)

	con, err := upgradeWebsocket.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return //if failed, gorilla alreadt wrote response in .cwrite so we dont need to
	}
	defer con.Close() //defer: singup following func for reverse order cleanup

	//first register of user present
	presence.mu.Lock() //blocking (waits turn)
	presence.users[userID] = con
	presence.mu.Unlock()

	defer func() {
		presence.mu.Lock()
		delete(presence.users, userID)
		presence.mu.Unlock()
	}() //() because fefer and multiple lines dont like each other

	for { //no condition for loop is infinite
		if _, _, err := con.ReadMessage(); err != nil {
			return
		}
	}
}

func OnlineUsersHandler(c *gin.Context) {
	presence.mu.Lock()
	userIDs := make([]string, 0, len(presence.users))
	for id := range presence.users {
		userIDs = append(userIDs, id)
	}
	presence.mu.Unlock()
	respondOK(c, http.StatusOK, gin.H{"online": userIDs})
}

func IsOnline(userID string) bool {
	presence.mu.Lock()
	_, ok := presence.users[userID]
	presence.mu.Unlock()
	return ok
}

func notifyUser(userID string, message any) {
	presence.mu.Lock()
	con := presence.users[userID]
	presence.mu.Unlock()
	if con == nil {
		return
	}
	_ = con.WriteJSON(message) //! small risk but in future protect with mutex lock
}

/*
* con.ReadMessage() - returns 3 values: message type (int): text, binary, close, ping, pong...
							*			payload ([]byte): the message btyes (data)
							*			error non nil of connect broke or client send close
* this is a blocking function
*/
