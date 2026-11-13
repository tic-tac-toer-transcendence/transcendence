package main

import (
	"log"
	"fmt"
	// "time"

	// "tac-backend/api"
	// "tac-backend/database"
	"tac-backend/internal/game"
	"tac-backend/internal/ai"
	// "github.com/gin-gonic/gin"
)

/*
func main() {

	time.Sleep(5 * time.Second) //! TEMP Fix: later add health check for database
	database.InitDB()           // init database, will exit on its own if it fails

	r := gin.Default() // creates Gin router with logger and recovery (default middleware)

	api.RegisterRoutes(r) // registers all routes to Gins Engine table

	if err := r.Run(); err != nil { // listen on socket
		log.Fatal("Failed to start server: ", err) //eg. Port already in use
	}
}
*/

func main() {
	fmt.Println("Lets start again")

	instErr, g := game.NewInstance("x")
	if instErr != nil {
		log.Printf("Could not create a new game instance: %s\n", instErr)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()

	if err := g.MakeMove(game.Move{Player: "x", Field: 1, Cell: 3}); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	
	if err := g.MakeMove(game.Move{Player: "o", Field: 3, Cell: 0}); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()

	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
}

/* Game
func main() {
	var test = new(game.Session)
	test.Selected = game.Unpositioned
	test.Winner = game.Ownerless
	player := game.Owner(rand.IntN(2) + int(game.Cross))
	var cmd string

	fmt.Println("---\nWe are now selecting the MidMid field\n---")
	test.SelectBoard(game.MidMid)

	test.Display()
	fmt.Println()
}
*/
