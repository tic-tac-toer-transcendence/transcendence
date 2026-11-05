package game

import (
	"log"
	"time"

	"tac-backend/database"
)

func NewGameID(Player1ID string, Player2ID string) string {
	return Player1ID + "-" + Player2ID + "-" + time.Now().Format("20060102150405") // this can be more complex, but for now this is enough to generate a unique ID
}

func NewInstance(Player1ID string, Player1Sym database.PlaySymbol, Player2ID string) (err error) {

	newGame := new(database.Game)
	
	newGame.ID = NewGameID(Player1ID, Player2ID)       // how about this?

	newGame.Player1ID = Player1ID
	// newGame.Player1                            // -> database.User
	newGame.Player1Symbol = Player1Sym
	
	newGame.Player2ID = Player2ID
	// newGame.Player2                            // -> database.User

	newGame.Status = database.StatusInProgress    // we probably should do a pending status first
	newGame.CreatedAt = time.Now()

	newGame.WinnerID = nil
	newGame.Winner = nil
	newGame.FinishedAt = nil

	log.Printf("new game instance initialized: ID %s\n", newGame.ID)
	return nil
}
