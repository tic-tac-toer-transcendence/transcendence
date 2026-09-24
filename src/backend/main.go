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
