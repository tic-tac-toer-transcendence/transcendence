package ai

import (
	"tac-backend/internal/game"
)

type Node struct {
	visits    int
	wins      int
	openMoves []game.Move
	children  []Node
}
