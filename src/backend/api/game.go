package api

import "github.com/gin-gonic/gin"

func GameSocketHandler(c *gin.Context) {

	//Part 1 -> change protocol from HTTP to WebSocket
	// * here connection stays open

	var count = 0
	for i := 0; i < count; i++ {
		//sometime broadcast
		//listen
		//decide
		//respond
	}

}
