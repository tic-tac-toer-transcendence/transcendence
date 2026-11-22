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

// Random move but with some tactics embedded
func pseudoRandomMove(g *game.Instance) game.Move {
	// TODO: Recognize how to win small board or block enemy small board win
	return randomMove(g)
}
