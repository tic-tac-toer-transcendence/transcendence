package ai

import (
	"tac-backend/internal/game"
	"math/rand"
	"time"
)

func GetMove(g *game.Instance, lvl Level) (game.Move, error) {
	switch lvl {
	case LvlNoob:
		time.Sleep(1 * time.Second)
		return randomMove(g), nil
	case LvlBeginner:
		time.Sleep(1 * time.Second)
		return pseudoRandomMove(g), nil
	default:
		return game.Move{}, ErrBadLevel
	}
}

// Completely random but guaranteed valid move
func randomMove(g *game.Instance) game.Move {
	moves := g.PossibleMoves()
	idx   := rand.Intn(len(moves))
	return moves[idx]
}

// Give the checks in the function below weights not to be
// fully blind to local maxima
const weightTakeWin    float32 = 0.9
const weightBlockOpWin float32 = 0.9
const weightBlockLoss  float32 = 0.7

// Random move but with some tactics embedded
func pseudoRandomMove(g *game.Instance) game.Move {

	// Check for (best) small board win (1.0 weight to take game win)

	// Check for not sending opponent to winning field
	
	// Check for block of small board loss
	
	return randomMove(g)
}
