package main

/*
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
*/

// ================================================================================================
// The part below is to experiment with functions without needing the database
// to be initialized
// ================================================================================================

import (
	"log"
	"fmt"
	"time"
	"math/rand"

	"tac-backend/internal/game"
	"tac-backend/internal/ai"

	"os"
)


func main() {

	rand.Seed(time.Now().UnixNano())
	start := time.Now()

	instErr, g := game.NewInstance("x")
	if instErr != nil {
		log.Printf("Could not create a new game instance: %s\n", instErr)
	}

	fmt.Println(g.PossibleMoves())

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()

	if err := g.MakeMove(game.Move{Player: "x", Field: 1, Cell: 3}); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	for _, v := range g.FreeFields() { fmt.Printf("%d ", v) }
	fmt.Println()
	g.Display()
	
	if err := g.MakeMove(game.Move{Player: "o", Field: 3, Cell: 0}); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	for _, v := range g.FreeFields() { fmt.Printf("%d ", v) }
	fmt.Println()
	g.Display()

	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	for _, v := range g.FreeFields() { fmt.Printf("%d ", v) }
	fmt.Println()
	g.Display()

	ai.SimulateGame(*g)

	fmt.Printf("Round: %d\n", g.Round())
	for _, v := range g.FreeFields() { fmt.Printf("%d ", v) }
	fmt.Println()
	g.Display()
	fmt.Printf("The winner is: %d\n", g.Winner())
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println(elapsed)
	os.Exit(0)
}
