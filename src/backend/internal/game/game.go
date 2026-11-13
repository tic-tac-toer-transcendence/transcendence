package game

import (
	"fmt"
	"log"
	"strings"
)

type Instance struct {
	board      [81]uint8
	crossTurn      bool    // is it at this moment the turn of Cross (true) or Circle (false)
	gameOver       bool    // does the whole game already have an outcome
	winner         uint8   // who won: none(0), cross(1), cirle(2)
	round          int     // how many rounds have been played
	fieldWinner [9]uint8   // who won this field? none yet(0), cross(1), circle(2), tied(4)
	nextField      uint8   // which field the next move must land; 9 -> free choice
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

	return nil, g
}

func (inst *Instance) Round() int {
	return inst.round
}
