package api

import (
	"errors"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func respondError(c *gin.Context, status int, code string, err error) {
	body := gin.H{"error": code}

	if err != nil {
		var ve validator.ValidationErrors
		if errors.As(err, &ve) {
			details := gin.H{}
			for _, e := range ve {

				details[strings.ToLower(e.Field())] = e.Tag()
			}
			body["details"] = details
		} else {
			body["message"] = err.Error()
		}
	}

	c.JSON(status, body)
}

func respondOK(c *gin.Context, status int, data gin.H) {
	c.JSON(status, data)
}
