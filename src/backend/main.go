package main

import (
	// External
	"github.com/gin-gonic/gin"

	// Std
	"fmt"
	"os"

	// Internal
	"tac-backend/internal/game"
)


func main() {

	var test = new(game.Session)
	test.Board.Top[0].Top[0] = game.Cross
	test.Board.Mid[0].Mid[1] = game.Circle

	test.Board.Display()
	// fmt.Println(test)

	fmt.Println()
	fmt.Print("The answer to the universe is: ")
	fmt.Println(game.Answer())
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
