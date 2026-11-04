package api

import (
	"net/http"

	"tac-backend/database"

	"github.com/gin-gonic/gin"
)

func LogoutHandler(c *gin.Context) {
	token, _ := c.Cookie("session")
	if err := database.DeleteSession(token); err != nil {
		respondError(c, http.StatusInternalServerError, "server_error", err)
		return
	}
	c.SetCookie("session", "", -1, "/", "", false, true)
	respondOK(c, http.StatusOK, gin.H{"message": "logged_out"})

}
