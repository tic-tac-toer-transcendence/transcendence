package main

import (
	"log"
	"time"

	"tac-backend/api"
	"tac-backend/database"

	"github.com/gin-gonic/gin"
)

func main() {

	time.Sleep(5 * time.Second) //! TEMP Fix: later add health check for database
	database.InitDB()           // init database, will exit on its own if it fails

	r := gin.Default() // creates Gin router with logger and recovery (default middleware)

	api.RegisterRoutes(r) // registers all routes to Gins Engine table

	if err := r.Run(); err != nil { // listen on socket
		log.Fatal("Failed to start server: ", err) //eg. Port already in use
	}
}

/* Game
func main() {
	var test = new(game.Session)
	test.Selected = game.Unpositioned
	test.Display()
	fmt.Println()

	fmt.Println("---\nWe are now selecting the MidMid field\n---")
	test.SelectBoard(game.MidMid)

	test.Display()
	fmt.Println()
}
*/
