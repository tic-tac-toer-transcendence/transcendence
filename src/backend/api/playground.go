package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"tac-backend/database"
)

func GetUsersHandler(c *gin.Context) {
	var users []database.User // container for data we will fetch, dynamid array

	result := database.DB.Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch users"})
		return
	}
	c.JSON(http.StatusOK, users)
}

func GetUserCountHandler(c *gin.Context) {
	var count int64

	query := database.DB.Model(&database.User{})
	result := query.Count(&count)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not fetch count"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}

func DeleteUserHandler(c *gin.Context) {

	id := c.Param("id")

	result := database.DB.Delete(&database.User{}, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	} else if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted"})
}

/*
!IMPORTANT: using GORM functions to fill up vars we created- when can GORM firgure out type (or where to look at)
! and when it cannot: when a type is in same form as GORM model - its okay, when its not (eg. passing int64 to
! get int back - then you have to "specify")


 Request from the client:
  POST /register HTTP/1.1              ← ① request line (method + path + protocol)
  Host: localhost:8080                   ┐
  Content-Type: application/json         ├─ ② headers (metadata)
  Content-Length: 97                     ┘
                                         ← ③ blank line (header/body separator)
  {                                      ┐
    "username": "alice",                 │
    "email":    "alice@example.com",     ├─ ④ body (the data)
    "password": "pw1234",                │
    "symbol":   "X"                      │
  }


 Response:
  HTTP/1.1 201 Created                   ← status: "I made the thing"
  Content-Type: application/json
  Content-Length: 54

  {"id":"7f3b2c1a-...","username":"alice"}

  *--------

Request:
  GET /users/7f3b2c1a-aaaa-bbbb-cccc HTTP/1.1   ← ID is in the URL path
  Host: localhost:8080
  Cookie: session=abc123xyz...                   ← auth: browser sent cookie automatically

  (no body — GETs don't carry bodies)

   Response:
  HTTP/1.1 200 OK
  Content-Type: application/json

  {"id":"7f3b2c1a-...","username":"alice","email":"alice@example.com", ...}

*------

 Request:
  GET /users?search=al&page=2 HTTP/1.1          ← filters tacked on after ?
  Host: localhost:8080
  Cookie: session=abc123xyz...

  Response:
  HTTP/1.1 200 OK
  Content-Type: application/json

  [
    {"id":"...","username":"alice", ...},
    {"id":"...","username":"albert", ...},
    {"id":"...","username":"alex", ...}
  ]
 *------

 PATCH /users/7f3b2c1a HTTP/1.1       ← ID in path (WHICH user)
  Host: localhost:8080
  Content-Type: application/json
  Cookie: session=abc123...

  {"email": "new-email@example.com"}   ← body (WHAT to change)
*/
