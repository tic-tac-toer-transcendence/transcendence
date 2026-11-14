package game

func (inst *Instance) WonField(field uint8) uint8 {

	if field > 8 {
		return 0
	}

	var  shift uint8 = field * 9
	var winner uint8 = 0

	// Skip check if already won (Only needed if won fields can still be used)
	if inst.fieldWinner[field] != 0 {
		winner = inst.fieldWinner[field]
		goto Skip
	}

	// all rows within the field
	for i := uint8(0); i < 3; i++ {
    	if inst.board[shift+i*3] != 0 && inst.board[shift+i*3] == inst.board[shift+i*3+1] && inst.board[shift+i*3] == inst.board[shift+i*3+2] {
        	winner = inst.board[shift+i*3]
			goto Skip
    	}
	}

	// all collumns within the field
	for i := uint8(0); i < 3; i++ {
    	if inst.board[shift+i] != 0 && inst.board[shift+i] == inst.board[shift+i+3] && inst.board[shift+i+3] == inst.board[shift+i+6] {
        	winner = inst.board[shift+i]
			goto Skip
    	}
	}

	// first dia
	if inst.board[shift] != 0 && inst.board[shift] == inst.board[shift+4] && inst.board[shift+4] == inst.board[shift+8] {
		winner = inst.board[shift]
		goto Skip
	}
	
	// second dia
	if inst.board[shift+2] != 0 && inst.board[shift+2] == inst.board[shift+4] && inst.board[shift+4] == inst.board[shift+6] {
		winner = inst.board[shift+2]
		goto Skip
	}

	Skip:

	// check tie
	isFull := true
	for i := uint8(0); i < 9; i++ {
		if inst.board[shift+i] == 0 {
			isFull = false
			break
		}
	}

	if isFull && winner == 0 {
		return 8
	} else if isFull && winner == 1 {
		return 10
	} else if isFull && winner == 2 {
		return 12
	}

	// nobody one yet
	return 0
}
