package api

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/register", RegisterHandler)
	r.GET("/users", GetUsersHandler)
	r.GET("/users/count", GetUserCountHandler)
	r.DELETE("/users/:id", DeleteUserHandler)
	r.GET("/ws/game/:id", GameSocketHandler)
}
