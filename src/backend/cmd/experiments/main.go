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


	instErr, g := game.NewInstance("x")
	if instErr != nil {
		log.Printf("Could not create a new game instance: %s\n", instErr)
	}

	/*
	start := time.Now()
	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println(elapsed)
	*/

	fmt.Printf("Round: %d\n", g.Round())
	for _, v := range g.FreeFields() { fmt.Printf("%d ", v) }
	fmt.Println()
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

	os.Exit(0)
}
