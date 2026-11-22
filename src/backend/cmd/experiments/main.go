package main

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

	// fmt.Println(g.PossibleMoves())

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}

	fmt.Printf("Round: %d\n", g.Round())
	g.Display()
	if err := g.MakeMove(ai.GetMove(g, 1000)); err != nil {
		log.Printf("Failed to make a move: %s\n", err)
	}
	
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println(elapsed)
	os.Exit(0)
}
