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

	if inst.gameOver {
		return ErrGameOver
	}

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
		return ErrOutOfRange
	}

	// Validate cell being free
	var idx = field * 9 + cell
	if inst.board[idx] != 0 {
		return ErrCellTaken
	}

	// Validate correct field
	if field != inst.nextField && inst.nextField != FreeChoice {
		return ErrWrongField
	} else if inst.nextField == FreeChoice && inst.fieldWinner[field] != 0 { // TODO: Depends on variant; Other variant allows won/tied field until all cells are filled -> better strategy
		return ErrWrongField
	}

	var ident uint8 = Cross
	if player == "O" {
		ident = Circle
	}

	// Make actual move
	inst.board[idx] = ident
	inst.fieldWinner[field] = inst.WonField(field)

	// Define next field // TODO: Also depends on variant i think
	if inst.fieldWinner[cell] == 0 {
		inst.nextField = cell
	} else {
		inst.nextField = FreeChoice
	}

	inst.round = inst.round + 1
	inst.lastMove = move
	inst.crossTurn = !inst.crossTurn
	inst.winner = inst.WonGame()
	if inst.winner != 0 {
		inst.gameOver = true
	}

	return nil
}

func (inst *Instance) FreeFields() []uint8 {
	vec := []uint8{}
	if inst.nextField != FreeChoice {
		vec = append(vec, inst.nextField)
	} else {
		for i := uint8(0); i < 9; i++ {
			// TODO: edit for ModeStrategic
			if inst.fieldWinner[i] == 0 {
				vec = append(vec, i)
			}
		}
	}
	return vec
}

// TODO: Error handling for fields too high
func (inst *Instance) FreeCells(field uint8) []uint8 {
	vec := []uint8{}
	for i := uint8(0); i < 9; i++ {
		if inst.board[i+field*9] == 0 {
			vec = append(vec, i)
		}
	}
	return vec
}
