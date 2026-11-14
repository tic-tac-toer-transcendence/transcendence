package game

import (
	"errors"
)

var (
	ErrBadPlayer   = errors.New("player must be X or O")
	ErrGameOver    = errors.New("game is already over")
	ErrNotYourTurn = errors.New("not your turn")
	ErrOutOfRange  = errors.New("field and cell must be 0-8")
	ErrWrongField  = errors.New("you can't play in this field")
	ErrCellTaken   = errors.New("cell is already taken")
)
