package game

import (
	"log"
	"time"

	"tac-backend/database"
)

func NewInstance(Player1ID string, Player1Sym database.PlaySymbol, Player2ID string) (err error) {

	newGame := new(database.Game)
	
	newGame.ID = "a1b2c32-ha5h-1d-wh4t3v3r"// what should this ID be?

	newGame.Player1ID = Player1ID
	// newGame.Player1                  // -> database.User
	newGame.Player1Symbol = Player1Sym
	
	newGame.Player2ID = Player2ID
	// newGame.Player2                     // -> database.User

	newGame.Status = database.StatusInProgress
	newGame.CreatedAt = time.Now()

	newGame.WinnerID = nil
	newGame.Winner = nil
	newGame.FinishedAt = nil

	log.Printf("new game instance initialized: ID %s\n", newGame.ID)
	return nil
}
