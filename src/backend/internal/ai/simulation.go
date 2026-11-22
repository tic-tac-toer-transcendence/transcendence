package ai

import (
	"tac-backend/internal/game"
)

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
