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
