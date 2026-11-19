package ai

import (
	"tac-backend/internal/game"
	"math/rand"
)

/*
* The AI should just act like a normal player and therefore return the
* same data a player would provide. That is essentially a move which
* the AI cannot do a wrong one (if done correctly)
*
* The AI is based on the Monte Carlo Tree Search (MCTS) and therefore
* can be made easier or more difficult based on the iterations given
*/

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

// Don't use on the actual game instance since this one changes it
// Function below makes a copy first
// Takes a game instance and makes a random valid move
func randomMove(g *game.Instance) {

	// Chose a random field if possible or the one you have to use
	fields := g.FreeFields()
	idx    := rand.Intn(len(fields))
    field  := fields[idx]

	// Chose a completely random cell
	cells  := g.FreeCells(field)
	idx     = rand.Intn(len(cells))
	cell   := cells[idx]

	// Chose a random free cell in that field
	var move = game.Move{Player: g.CurrentPlayer(), Field: field, Cell: cell}
	g.MakeMove(move)
}

func SimulateGame(g *game.Instance) uint8 {//TODO: make private and reference by COPY
	for true {
		randomMove(g)
		if res := g.Winner(); res != 0 {
			return res
		}
	}
	return 0
}
