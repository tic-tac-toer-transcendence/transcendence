package api

import (
	"errors"
	"net/http"
	"tac-backend/database"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgconn"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func handleDBError(c *gin.Context, err error) bool {
	if err == nil {
		return false
	}
	if errors.Is(err, gorm.ErrDuplicatedKey) {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			switch pgErr.ConstraintName {
			case "uni_users_email":
				respondError(c, http.StatusConflict, "email_taken", nil)
				return true
			case "uni_users_username":
				respondError(c, http.StatusConflict, "username_taken", nil)
				return true
			}
		}
		respondError(c, http.StatusConflict, "duplicate", nil)
		return true
	}
	respondError(c, http.StatusInternalServerError, "server_error", err)
	return true
}

func RegisterHandler(c *gin.Context) {
	var req struct {
		Email    string `json:"email"    binding:"required,email"`
		Password string `json:"password" binding:"required,min=6,max=72"`
		Username string `json:"username" binding:"required,min=3,max=16"`
		Symbol   string `json:"symbol"   binding:"required,oneof=X O"`
	}
	err := c.ShouldBindJSON(&req)
	if err != nil {
		respondError(c, http.StatusBadRequest, "validation_fail", err)
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
		handleDBError(c, result.Error)
		return
	}
	respondOK(c, http.StatusCreated, gin.H{
		"id":       user.ID,
		"username": user.Username,
	})
}
