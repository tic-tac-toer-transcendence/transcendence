package ai

import (
	"tac-backend/internal/game"
)

/*
* The AI should just act like a normal player and therefore return the
* same data a player would provide. That is essentially a move which
* the AI cannot do a wrong one (if done correctly)
*
* The AI is based on the Monte Carlo Tree Search (MCTS) and therefore
* can be made easier or more difficult based on the iterations given
*/

type Level uint8

const (
    Noob Level = iota
    Pro
    God
)

func GetMove(g *game.Instance, iterations int) game.Move {

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
