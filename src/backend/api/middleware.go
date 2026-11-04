package api

import (
	"errors"
	"net/http"

	"tac-backend/database"

	"github.com/gin-gonic/gin"
)

func SessionMiddleware(c *gin.Context) {

	token, err := c.Cookie("session")
	if err != nil {
		respondError(c, http.StatusUnauthorized, "no_session", nil)
		c.Abort() // tells gin not to run next handler or middleware, return is still needed!
		return
	}

	userID, err := database.LookupSession(token)
	if err != nil {
		if errors.Is(err, database.ErrSessionInvalid) {
			respondError(c, http.StatusUnauthorized, "invalid_session", nil)
		} else {
			respondError(c, http.StatusInternalServerError, "server_error", err)
		}
		c.Abort()
		return
	}
	c.Set("userID", userID)
}
