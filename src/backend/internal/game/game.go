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
const strategic bool = false // Not yet fully implemented though

type Instance struct {
	board      [81]uint8
	crossTurn      bool    // is it at this moment the turn of Cross (true) or Circle (false)
	gameOver       bool    // does the whole game already have an outcome
	winner         uint8   // who won: none(0), cross(1), cirle(2), tie(3)
	round          int     // how many rounds have been played
	/*
	* For fun we are doing bit stuff here:
	* - 0000 ->  (0) - nobody won
	* - 0001 ->  (1) - cross won
	* - 0100 ->  (2) - circle won
	* - 1000 ->  (8) - tie and full
	* - 1100 -> (12) - circle won and full
	* - 1010 -> (10) - cross won and full
	* => Check is full can be done with a check of 4th bit
	*/
	fieldWinner [9]uint8
	nextField      uint8   // which field the next move must land; 9 -> free choice
	lastMove       Move    // last move, initialized with bullshit, to send to opponent session
}

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
	g.nextField = 9
	g.lastMove = Move{Player: "None", Field: 67, Cell: 67}

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
