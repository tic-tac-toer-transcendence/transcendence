package game

import "fmt"

type Owner int

const (
    Ownerless Owner = iota
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
		if owner == Ownerless {
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

type Position int

const (
	TopLeft Position = iota
	TopMid
	TopRight
	MidLeft
	MidMid
	MidRight
	BottomLeft
	BottomMid
	BottomRight
	Unpositioned
)

func (p Position) String() string {
	switch p {
	case TopLeft:
		return "Top-Left"
	case TopMid:
		return "Top-Mid"
	case TopRight:
		return "Top-Right"
	case MidLeft:
		return "Mid-Left"
	case MidMid:
		return "Mid-Mid"
	case MidRight:
		return "Mid-Right"
	case BottomLeft:
		return "Bottom-Left"
	case BottomMid:
		return "Bottom-Mid"
	case BottomRight:
		return "Bottom-Right"
	default:
		return "None"
	}
}

var colorReset = "\033[0m"
var colorBlue = "\033[36m"

func displayRowOut(board [3]BoardIn, selected int) {
	for i := 0; i < 3; i++ {
		if i == selected {
			fmt.Print(colorBlue)
		}
		displayRowIn(board[i].Top)
		fmt.Print(colorReset)
		fmt.Print("  ")
	}
	fmt.Println()
	for i := 0; i < 3; i++ {
		if i == selected {
			fmt.Print(colorBlue)
		}
		displayRowIn(board[i].Mid)
		fmt.Print(colorReset)
		fmt.Print("  ")
	}
	fmt.Println()
	for i := 0; i < 3; i++ {
		if i == selected {
			fmt.Print(colorBlue)
		}
		displayRowIn(board[i].Bottom)
		fmt.Print(colorReset)
		fmt.Print("  ")
	}
}

func (board BoardOut) Display(selected Position) {
	var sel = int(selected)
	if sel < 3 {
		displayRowOut(board.Top, int(selected))
	} else {
		displayRowOut(board.Top, -1)
	}
	fmt.Print("\n\n")

	if sel > 2 && sel < 6 {
		displayRowOut(board.Mid, sel - 3)
	} else {
		displayRowOut(board.Mid, -1)
	}
	fmt.Print("\n\n")

	if sel > 5 {
		displayRowOut(board.Mid, sel - 6)
	} else {
		displayRowOut(board.Mid, -1)
	}
	fmt.Println()
}

type Session struct {
	Board		BoardOut
	Selected	Position
	Turn		int
}

func (s Session) Display() {
	s.Board.Display(s.Selected)
	fmt.Printf("Currently selected: %s", s.Selected.String())
}

func (s *Session) SelectBoard(p Position) {
	if s.Turn == 0 {
		s.Selected = p
	}
}
