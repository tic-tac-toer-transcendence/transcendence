package ai

import (
	"tac-backend/internal/game"
	"math/rand"
	"time"
)

type Level int

// Rather than probing for iterations there should be levels
// Users of the ai do not need to know about the concept of iterations
const (
	LvlNoob     Level = iota // Random valid moves
	LvlBeginner              // Pseudo random (wins small boards, blocks small board wins, etc)
	LvlAmateur               // MCTS with 100 iterations
	LvlPro                   // MCTS with 1000 iterations
	LvlGod                   // MCST with 10000 iterations
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
