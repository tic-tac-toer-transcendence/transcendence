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
		return "TopLeft"
	case TopMid:
		return "TopMid"
	case TopRight:
		return "TopRight"
	case MidLeft:
		return "MidLeft"
	case MidMid:
		return "MidMid"
	case MidRight:
		return "MidRight"
	case BottomLeft:
		return "BottomLeft"
	case BottomMid:
		return "BottomMid"
	case BottomRight:
		return "BottomRight"
	default:
		return "None"
	}
}

func StrToPos(s string) Position {
	switch s {
	case "TopLeft":
		return TopLeft
	case "TopMid":
		return TopMid
	case "TopRight":
		return TopRight
	case "MidLeft":
		return MidLeft
	case "MidMid":
		return MidMid
	case "MidRight":
		return MidRight
	case "BottomLeft":
		return BottomLeft
	case "BottomMid":
		return BottomMid
	case "BottomRight":
		return BottomRight
	default:
		return Unpositioned
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


func displayField(
	owner Owner,
	boardPos Position,
	fieldPos Position,
	selected Position,
) {
	// Add field checks here later.

	symbol := " "
	if owner != Ownerless {
		symbol = owner.String()
	}

	if boardPos == selected {
		fmt.Print(colorBlue)
	}

	fmt.Print(symbol)
	fmt.Print(colorReset)
}

//nested looping through the fields, instead of the boards, to display the whole board with all inner boards and fields

func (board BoardOut) Display(selected Position) {
	boards := [3][3]BoardIn{
		board.Top,
		board.Mid,
		board.Bottom,
	}

	for boardRow, row := range boards {
		for fieldRow := 0; fieldRow < 3; fieldRow++ {
			for boardCol, inner := range row {
				fields := [3][3]Owner{
					inner.Top,
					inner.Mid,
					inner.Bottom,
				}

				boardPos := Position(boardRow*3 + boardCol)

				if boardPos == selected {
					fmt.Print(colorBlue)
				}
				fmt.Print("[")
				fmt.Print(colorReset)

				for fieldCol, owner := range fields[fieldRow] {
					fieldPos := Position(fieldRow*3 + fieldCol)

					displayField(owner, boardPos, fieldPos, selected)

					if fieldCol < 2 {
						if boardPos == selected {
							fmt.Print(colorBlue)
						}
						fmt.Print("|")
						fmt.Print(colorReset)
					}
				}

				if boardPos == selected {
					fmt.Print(colorBlue)
				}
				fmt.Print("]")
				fmt.Print(colorReset)
				fmt.Print("  ")
			}
			fmt.Println()
		}

		if boardRow < 2 {
			fmt.Println()
		}
	}
}

type Session struct {
	Board		BoardOut
	Selected	Position
	Turn		int
	Winner		Owner
}

func (s Session) Display() {
	s.Board.Display(s.Selected)
	// fmt.Printf("Currently selected: %s", s.Selected.String())
}

func (s *Session) SelectBoard(p Position) {
	// TODO: Add error handling for non existent positions
	s.Selected = p
}

func (s *Session) MarkField(field Position, player Owner) error {
	if s.Selected < TopLeft || s.Selected > BottomRight {
		return fmt.Errorf("invalid board")
	}
	if field < TopLeft || field > BottomRight {
		return fmt.Errorf("invalid field")
	}
	if player != Cross && player != Circle {
		return fmt.Errorf("invalid player")
	}

	// Get the actual inner board, using a pointer.
	var inner *BoardIn
	boardIndex := int(s.Selected)

	switch boardIndex / 3 {
	case 0:
		inner = &s.Board.Top[boardIndex%3]
	case 1:
		inner = &s.Board.Mid[boardIndex%3]
	case 2:
		inner = &s.Board.Bottom[boardIndex%3]
	}

	// Get the actual cell inside that board.
	var cell *Owner
	fieldIndex := int(field)

	switch fieldIndex / 3 {
	case 0:
		cell = &inner.Top[fieldIndex%3]
	case 1:
		cell = &inner.Mid[fieldIndex%3]
	case 2:
		cell = &inner.Bottom[fieldIndex%3]
	}

	if *cell != Ownerless {
		return fmt.Errorf("field is already occupied")
	}

	*cell = player
	return nil
}