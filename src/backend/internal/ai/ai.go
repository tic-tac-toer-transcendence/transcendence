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

	// === TEMPORARY ===
	// Just return a random *valid* move as AI draft 01
	// This allows to play against the bot before the AI is intelligent
	return randomMove(g)

	/*
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
	*/
}

func randomMove(g *game.Instance) game.Move {
	moves := g.PossibleMoves()
	idx   := rand.Intn(len(moves))
	return moves[idx]
}

// Game is copied instead of referenced to not change the actual game state
func SimulateGame(g game.Instance) uint8 {
	for true {
		randMove := randomMove(&g)
		g.MakeMove(randMove)
		if res := g.Winner(); res != 0 {
			return res
		}
	}
	return 0
}
