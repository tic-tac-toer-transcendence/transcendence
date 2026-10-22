package api

import (
	"net/http"

	"tac-backend/database"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func LoginHandler(c *gin.Context) {
	var req struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		respondError(c, http.StatusBadRequest, "validation_fail", err)
		return
	}

	var user database.User
	result := database.DB.Where("email = ?", req.Email).First(&user)
	if result.Error != nil {
		respondError(c, http.StatusUnauthorized, "invalid_credentials", nil)
		return
	}
	errr := bcrypt.CompareHashAndPassword([]byte(user.PassHash), []byte(req.Password))
	if errr != nil {
		respondError(c, http.StatusUnauthorized, "invalid_credentials", nil)
		return
	}

	token, err := database.CreateSession(user.ID)
	if err != nil {
		respondError(c, http.StatusInternalServerError, "session_create_failed", err)
		return
	}
	c.SetCookie( //! might need to change vlaues based on what we need on produciton
		"session", //name of the cookie
		token,     //name of the value
		60*60*24*7,
		"/",   //path
		"",    //domain (nothing for default)
		false, //!when NGINX change to true
		true,  //cant read cookie (XSS proteciton)
	)
	respondOK(c, http.StatusOK, gin.H{
		"id":       user.ID,
		"username": user.Username,
	})

}
