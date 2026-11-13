package game


func (inst *Instance) WonField(field uint8) uint8 {

	if field > 8 {
		return 0
	}

	var shift uint8 = field * 9

	// all rows within the field
	for i := uint8(0); i < 3; i++ {
    	if inst.board[shift+i*3] != 0 && inst.board[shift+i*3] == inst.board[shift+i*3+1] && inst.board[shift+i*3] == inst.board[shift+i*3+2] {
        	return inst.board[shift+i*3]
    	}
	}

	// all collumns within the field
	for i := uint8(0); i < 3; i++ {
    	if inst.board[shift+i] != 0 && inst.board[shift+i] == inst.board[shift+i+3] && inst.board[shift+i+3] == inst.board[shift+i+6] {
        	return inst.board[shift+i]
    	}
	}

	// first dia
	if inst.board[shift] != 0 && inst.board[shift] == inst.board[shift+4] && inst.board[shift+4] == inst.board[shift+8] {
		return inst.board[shift]
	}
	
	// second dia
	if inst.board[shift+2] != 0 && inst.board[shift+2] == inst.board[shift+4] && inst.board[shift+4] == inst.board[shift+6] {
		return inst.board[shift+2]
	}

	// check tie
	isTie := true
	for i := uint8(0); i < 9; i++ {
		if inst.board[shift+i] == 0 {
			isTie = false
			break
		}
	}
	if isTie {
		return 4
	}

	// nobody one yet
	return 0
}
