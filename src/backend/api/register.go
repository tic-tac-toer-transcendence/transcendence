package api

import (
	"net/http"
	"tac-backend/database"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func RegisterHandler(c *gin.Context) {
	var req struct {
		Email    string `json:"email"    binding:"required,email"`
		Password string `json:"password" binding:"required,min=6,max=72"`
		Username string `json:"username" binding:"required,min=3,max=16"`
		Symbol   string `json:"symbol"   binding:"required,oneof=X O"`
	}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	hash, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)

	user := database.User{
		Username:   req.Username,
		PassHash:   string(hash),
		UserSymbol: database.PlaySymbol(req.Symbol),
		Email:      req.Email,
	}
	result := database.DB.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username or email already exists"}) //* error return not perfect here
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"id":       user.ID,
		"username": user.Username,
	})

}
