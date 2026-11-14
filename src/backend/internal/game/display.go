package game

import (
	"fmt"
)

const (
	colorReset = "\033[0m"
	colorBlue  = "\033[36m"
)

func (inst *Instance) symbol(v uint8) string {
	switch v {
	case Cross:
		return "X"
	case Circle:
		return "O"
	default:
		return " "
	}
}

func (inst *Instance) Display() {
	for boardRow := uint8(0); boardRow < 3; boardRow++ {
		for fieldRow := uint8(0); fieldRow < 3; fieldRow++ {
			for boardCol := uint8(0); boardCol < 3; boardCol++ {
				board := boardRow*3 + boardCol
				base := board * 9

				color := ""
				if board == inst.nextField {
					color = colorBlue
				}

				fmt.Print(color, "[", colorReset)
				for fieldCol := uint8(0); fieldCol < 3; fieldCol++ {
					fmt.Print(inst.symbol(inst.board[base+fieldRow*3+fieldCol]))
					if fieldCol < 2 {
						fmt.Print(color, "|", colorReset)
					}
				}
				fmt.Print(color, "]", colorReset, "  ")
			}
			fmt.Println()
		}
		if boardRow < 2 {
			fmt.Println()
		}
	}
	fmt.Println()
}
