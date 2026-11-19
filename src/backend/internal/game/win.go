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
	// Return current winner if the field is not full
	for i := uint8(0); i < 9; i++ {
		if inst.board[shift+i] == 0 {
			return winner
		}
	}
	// Toggle 4th bit on if full
	return winner | Full
}

func (inst *Instance) WonGame() uint8 {

        var winner uint8 = 0

        // all rows
        for i := uint8(0); i < 3; i++ {
        if inst.fieldWinner[i*3]&WinMask != 0 && inst.fieldWinner[i*3]&WinMask == inst.fieldWinner[i*3+1]&WinMask && inst.fieldWinner[i*3]&WinMask == inst.fieldWinner[i*3+2]&WinMask {
                winner = inst.fieldWinner[i*3] & WinMask
                        goto Skip
        }
        }

        // all collumns
        for i := uint8(0); i < 3; i++ {
        if inst.fieldWinner[i]&WinMask != 0 && inst.fieldWinner[i]&WinMask == inst.fieldWinner[i+3]&WinMask && inst.fieldWinner[i]&WinMask == inst.fieldWinner[i+6]&WinMask {
                winner = inst.fieldWinner[i] & WinMask
                        goto Skip
        }
        }

        // first dia
        if inst.fieldWinner[0]&WinMask != 0 && inst.fieldWinner[0]&WinMask == inst.fieldWinner[4]&WinMask && inst.fieldWinner[0]&WinMask == inst.fieldWinner[8]&WinMask {
                winner = inst.fieldWinner[0] & WinMask
                goto Skip
        }

        // second dia
        if inst.fieldWinner[2]&WinMask != 0 && inst.fieldWinner[2]&WinMask == inst.fieldWinner[4]&WinMask && inst.fieldWinner[2]&WinMask == inst.fieldWinner[6]&WinMask {
                winner = inst.fieldWinner[2] & WinMask
                goto Skip
        }

        Skip:

        var crossWins  uint8 = 0
        var circleWins uint8 = 0
        var decided    uint8 = 0
        var fullFields uint8 = 0

        for i := uint8(0); i < 9; i++ {
                fieldWinner := inst.fieldWinner[i]
                if fieldWinner&WinMask == Cross {
                        crossWins++
                } else if fieldWinner&WinMask == Circle {
                        circleWins++
                }
                if fieldWinner != 0 { // won or full
                        decided++
                }
                if (fieldWinner & Full) != 0 {
                        fullFields++
                }
        }

        if winner != Cross && winner != Circle {
                if ModeEasyWin && crossWins >= 5 {
                        return Cross
                } else if ModeEasyWin && circleWins >= 5 {
                        return Circle
                }
                if !ModeStrategic && decided == 9 {
                        return Full
                }
                if ModeStrategic && fullFields == 9 {
                        return Full
                }
        }

        return winner
}
