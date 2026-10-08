package main

import (
	// External
	"github.com/gin-gonic/gin"

	// Std
	"os"
	"os/exec"
	"fmt"
	"strings"
	"math/rand/v2"

	// Internal
	"tac-backend/internal/game"
)

// Clear the temrinal -- Only needed in demo
func doClear() {
	c := exec.Command("clear")
	c.Stdout = os.Stdout
	c.Run()
}

func exitOnRequest(cmd string) {
	if strings.ToLower(cmd) == "exit" {
		fmt.Println("Exiting...")
		os.Exit(0)
	}
}

func main() {

	// === Init Game
	var test = new(game.Session)
	test.Selected = game.Unpositioned
	test.Winner = game.Ownerless
	player := game.Owner(rand.IntN(2) + int(game.Cross))
	var cmd string

	// First player choses staring field -- Later an event active during the whole turn 0
	doClear()
	fmt.Printf("%s - Select an inner field to start with: ", player.String())
	fmt.Scanln(&cmd)
	exitOnRequest(cmd)
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
		exitOnRequest(cmd) //added exit on request

		// Add the mark of the current player into the field
		

		field := game.StrToPos(cmd)

		if err := test.MarkField(field, player); err != nil {
			fmt.Println(err)
			fmt.Println("Press Enter to try again.")
			fmt.Scanln()
			continue
		}

		// === Prepare next turn

		test.SelectBoard(field)

		test.Turn += 1

		fmt.Printf("The board %s has a winner: %s\n", test.Selected.String(), test.Board.Winner.String())

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
