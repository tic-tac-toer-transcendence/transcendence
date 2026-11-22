package ai

import (
	"tac-backend/internal/game"
	"math/rand"
	"time"
)

func GetMove(g *game.Instance, iterations int) game.Move {
	time.Sleep(1 * time.Second)
	return randomMove(g)
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
