package game

import (
	"strings"
)

type Move struct {
	Field  uint8
	Cell   uint8
	Player string
}

func (inst *Instance) MakeMove(move Move) error {

	player := move.Player
	field  := move.Field
	cell   := move.Cell

	// Validate identifier
	player = strings.ToUpper(player)
	if player != "X" && player != "O" {
		return ErrBadPlayer
	}

	// Validate turn
	if player == "X" && !inst.crossTurn {
		return ErrNotYourTurn
	} else if player == "O" && inst.crossTurn {
		return ErrNotYourTurn
	}

	// Validate bounds
	if field > 8 || cell > 8 {
		return ErrBadPlayer
	}

	// Validate cell being free
	var idx = field * 9 + cell
	if inst.board[idx] != 0 {
		return ErrCellTaken
	}

	// Validate correct field
	if field != inst.nextField && inst.nextField != 9 {
		return ErrWrongField
	} else if inst.nextField == 9 && inst.fieldWinner != 0 { // Depends on variant; Other variant allows won/tied field until all cells are filled -> better strategy
		return ErrWrongField
	}

	var ident uint8 = 1 // TODO: remove magic number
	if player == "O" {
		ident = 2 // TODO: remove magic number
	}

	// Make actual move
	inst.board[idx] = ident
	inst.fieldWinner[field] = inst.WonField(field)

	// Define next field
	if inst.fieldWinner[cell] == 0 {
		inst.nextField = cell
	} else {
		inst.nextField = 9
	}

	inst.round = inst.round + 1
	inst.lastMove = move
	inst.crossTurn = !inst.crossTurn

	return nil
}
