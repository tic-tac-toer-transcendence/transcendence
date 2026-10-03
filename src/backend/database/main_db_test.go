package database

import (
	"testing" //go's own testing package. No () because its single package
	"os"
)

// Unused packages result in compilation errors in Go

func TestMain (m *testing.M) {
	InitDB() //database connect
	os.Exit(m.Run()) //run tests
}

func TestPing(t *testing.T) {
	if DB == nil {
		t.Fatal("DB is nil")
	}
}

func TestCreateUser(t *testing.T) {
	user := User {
		Username: "FirstUser",
		Email: "Domagojbuk@gmail.co",
		PassHash: "hash",
		UserSymbol: SymbolX,
	}
	result := DB.Create(&user)// Adress of because GORM will write back into stuct (and fill ID
	
	if result.Error != nil {
		t.Fatal("Failed to create user:", result.Error)
	}
	t.Cleanup(func() { // sets User for cleanup after test is done (even if it fails)!!!
		DB.Delete(&user)
	})
	if (user.ID == "") {
		t.Fatal("User ID is empty after creation")
	}
	
	var fetchedUser User// Explicit form of declaration (Because GORM fills it)
	result = DB.First(&fetchedUser, "id = ?", user.ID)
	//also valid:result = DB.First(&fetchedUser, user.ID)
	if result.Error != nil {
		t.Fatal("Failed to fetch user:", result.Error)
	}
	if fetchedUser.Username != user.Username || fetchedUser.Email != user.Email {
		t.Fatal("Fetched user does not match created user")
	}
}

func TestUserNotFound (t *testing.T) {
	var user User
	result := DB.First(&user, "id = ?",  "Not valid ID Duhh")
	if result.Error == nil {
		t.Fatal("This should not happen, user shouldnt have been found")
	}
}
func TestDuplicateUser(t *testing.T) {
	user1 := User {
		Username: "FirstUser",
		Email: "firstuser@example.com",
		PassHash: "hash1",
		UserSymbol: SymbolX,
	}
	DB.Create(&user1)

	user2 := User {
		Username: "FirstUser",
		Email: "seconduser@example.com",
		PassHash: "hash2",
		UserSymbol: SymbolO,
	}
	result := DB.Create(&user2)
	if result.Error == nil {
		t.Fatal("This should not happen, duplicate user should not be allowed")
	}
}