package main

import (
	// External
	"github.com/gin-gonic/gin"

	// Std
	"os"
	"os/exec"
	"fmt"

	// Internal
	"tac-backend/internal/game"
)

// Clear the temrinal -- Only needed in demo
func doClear() {
	c := exec.Command("clear")
	c.Stdout = os.Stdout
	c.Run()
}

func main() {

	// === Init Game
	var test = new(game.Session)
	test.Selected = game.Unpositioned
	test.Winner = game.Ownerless
	var player game.Owner = game.Cross // Cross always begins now, later random
	var cmd string

	// First player choses staring field -- Later an event active during the whole turn 0
	doClear()
	fmt.Printf("%s - Select an inner field to start with: ", player.String())
	fmt.Scanln(&cmd)
	var board game.Position = game.StrToPos(cmd)
	test.SelectBoard(board)

	// === Testing game loop
	for test.Winner == game.Ownerless {
		// Clear terminal for demo
		doClear()

		// Display stats and playing field
		fmt.Printf("Turn:            %d\n", test.Turn)
		fmt.Println("Selected field: ", test.Selected)
		test.Display()
		fmt.Println()

		// Ask for field to mark
		fmt.Printf("%s - Mark your field: ", player.String())
		fmt.Scanln(&cmd)

		// Add the mark of the current player into the field
		



		// === Prepare next turn
		board = game.StrToPos(cmd) // No error handling!
		test.SelectBoard(board)

		test.Turn += 1

		if player == game.Cross {
			player = game.Circle
		} else {
			player = game.Cross
		}
	}





	// === Exiting to ignore code below this point for now
	os.Exit(0)

	// This is from the gin tutorial
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run() // listens on 0.0.0.0:8080 by default
}
