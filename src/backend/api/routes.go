package api

import (
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/register", RegisterHandler)
	r.POST("/login", LoginHandler)

	auth := r.Group("/")
	auth.Use(SessionMiddleware)
	//also one liner is valid: auth := r.Group("/", SessionMidlleware)
	{ //in this case just visual - not needed here
		auth.GET("/users", GetUsersHandler)
		auth.GET("/users/count", GetUserCountHandler)
		auth.DELETE("/users/:id", DeleteUserHandler)
		//auth.GET("/ws/game/:id", GameSocketHandler)
		auth.POST("/logout", LogoutHandler)
		auth.GET("/ws/presence", PresenceHandlerWS)
		auth.GET("/users/online", OnlineUsersHandler)
	}

}
