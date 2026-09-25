package game

import "fmt"

type Owner int

const (
    None Owner = iota
    Cross
    Circle
)

func (o Owner) String() string {
    switch o {
    case Cross:
        return "X"
    case Circle:
        return "O"
    default:
        return "None"
    }
}

type BoardIn struct {
	Top    [3]Owner
	Mid    [3]Owner
	Bottom [3]Owner
	Winner Owner
}

func displayRowIn(row [3]Owner) {
	fmt.Print("[")
	for i := 0; i < 3; i++ {
		var owner = row[i]
		if owner == None {
			fmt.Printf("%s", " ")
		} else {
			fmt.Printf("%s", row[i].String())
		}
		if i < 2 {
			fmt.Print("|")
		}
	}
	fmt.Print("]")
}

func (board BoardIn) Display() {
	displayRowIn(board.Top)
	fmt.Println()
	displayRowIn(board.Mid)
	fmt.Println()
	displayRowIn(board.Bottom)
	fmt.Println()
}

type BoardOut struct {
	Top    [3]BoardIn
	Mid    [3]BoardIn
	Bottom [3]BoardIn
	Winner Owner
}

func displayRowOut(board [3]BoardIn) {
	for i := 0; i < 3; i++ {
		displayRowIn(board[i].Top)
		fmt.Print("  ")
	}
	fmt.Println()
	for i := 0; i < 3; i++ {
		displayRowIn(board[i].Mid)
		fmt.Print("  ")
	}
	fmt.Println()
	for i := 0; i < 3; i++ {
		displayRowIn(board[i].Bottom)
		fmt.Print("  ")
	}
}

func (board BoardOut) Display() {
	displayRowOut(board.Top)
	fmt.Print("\n\n")
	displayRowOut(board.Mid)
	fmt.Print("\n\n")
	displayRowOut(board.Bottom)
	fmt.Println()
}

type Session struct {
	Board BoardOut
}
