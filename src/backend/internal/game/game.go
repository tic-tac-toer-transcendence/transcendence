package game

import (
	"fmt"
	"log"
	"strings"
)

// The typical game variant counts a won field in the board as unplayable
//
// Turning this option on will allow to still use an already won field
// for strategic purposes until it is completely filled
const ModeStrategic bool = false // Not yet fully implemented though
// According to wikipedia there is a simplified version in which a win can
// also be achieved by winning 5 fields in any order
const ModeEasyWin   bool = false

type Instance struct {
	board      [81]uint8
	crossTurn      bool    // is it at this moment the turn of Cross (true) or Circle (false)
	gameOver       bool    // does the whole game already have an outcome
	winner         uint8   // who won: none(0), cross(1), cirle(2), tie(3)
	round          int     // how many rounds have been played
	/*
	* For fun we are doing bit stuff here:
	* - 0000 -> (0) - nobody won
	* - 0001 -> (1) - cross won
	* - 0010 -> (2) - circle won
	* - 0100 -> (4) - tie and full
	* - 0101 -> (5) - cross won and full
	* - 0110 -> (6) - circle won and full
	* => Check is full can be done with a check of 4th bit
	*/
	fieldWinner [9]uint8
	nextField      uint8   // which field the next move must land; 9 -> free choice
	lastMove       Move    // last move, initialized with bullshit, to send to opponent session
}

const (
	Cross      uint8 = 1      // 0b0001
	Circle     uint8 = 2      // 0b0010
	Full       uint8 = 4      // 0b0100
	WinMask    uint8 = 0b11   // 0b0011
	FreeChoice uint8 = 9
	Garbage    uint8 = 67
)

func NewInstance(first string) (err error, inst *Instance){

	// Create a new instance of the struct
	var g = new(Instance)
	
	// Validate first player
	if strings.ToUpper(first) == "X" {
		g.crossTurn = true
		log.Println("Cross begins")
	} else if strings.ToUpper(first) == "O" {
		g.crossTurn = false
		log.Println("Circle begins")
	} else {
		fmt.Printf("Not a valid identifier: %s\n", first)
		return ErrBadPlayer, nil
	}

	// Set next field
	g.nextField = FreeChoice
	g.lastMove = Move{Player: "None", Field: Garbage, Cell: Garbage}

	return nil, g
}

func (inst *Instance) Round() int {
	return inst.round
}

func (inst *Instance) LastMove() Move {
	return inst.lastMove
}

func (inst *Instance) NextField() uint8 {
	return inst.nextField
}

func (inst *Instance) Winner() uint8 {
	return inst.winner
}

func (inst *Instance) CurrentPlayer() string {
	if inst.crossTurn {
		return "X"
	} else {
		return "O"
	}
}
