package main

import (
	// External
	"github.com/gin-gonic/gin"

	// Std
	"os"
	"fmt"

	// Internal
	"tac-backend/internal/game"
)


func main() {

	var test = new(game.Session)
	test.Selected = game.Unpositioned
	test.Display()
	fmt.Println()

	fmt.Println("---\nWe are now selecting the MidMid field\n---")
	test.SelectBoard(game.MidMid)
	
	test.Display()
	fmt.Println()

	// fmt.Println()
	// fmt.Print("The answer to the universe is: ")
	// fmt.Println(game.Answer())
	
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
