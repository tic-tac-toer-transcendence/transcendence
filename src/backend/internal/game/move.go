package game

import (
	"strings"
)

func (inst *Instance) MakeMove(player string, field uint8, cell uint8) error {

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
	}

	var ident uint8 = 1 // TODO: remove magic number
	if player == "O" {
		ident = 2 // TODO: remove magic number
	}

	// Make actual move
	inst.board[idx] = ident

	// Define next field
	fieldWinner := inst.WonField(cell)
	if fieldWinner == 0 {
		inst.nextField = cell
	} else {
		inst.nextField = 9
	}

	inst.round = inst.round + 1
	inst.crossTurn = !inst.crossTurn

	return nil
}
