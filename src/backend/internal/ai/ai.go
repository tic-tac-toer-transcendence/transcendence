package ai

import (
	"tac-backend/internal/game"
)

/*
* The AI should just act like a normal player and therefore return the
* same data a player would provide. That is essentially a move which
* the AI cannot do a wrong one (if done correctly)
*
* The AI should come in 3 difficulties:
* - Noob: Fields are choosen completely at random
* - Pro:  The AI makes quite good moves
* - God:  The AI plays a mathematically perfect game
*
*/

type Level uint8

const (
    Noob Level = iota
    Pro
    God
)

func GetMove(g *game.Instance, lvl uint8) game.Move {

	// Ai always plays the players whos turn it is at the moment
	player := g.CurrentPlayer()

	// choosing a field
	var field uint8 = g.NextField()
	if field == uint8(9) {
		// Logic to chose best field (use FieldWinner for easier chosing)
	}

	// choosing a cell
	var cell uint8 = 0

	return game.Move{Player: player, Field: field, Cell: cell}
}
