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

type FieldIn struct {
	Top    [3]Owner
	Mid    [3]Owner
	Bottom [3]Owner
	Winner Owner
}

func displayRow(row [3]Owner) {
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
	fmt.Println("]")
}

func (f FieldIn) Display() {
	displayRow(f.Top)
	displayRow(f.Mid)
	displayRow(f.Bottom)
}

type FieldOut struct {
	Top    [3]FieldIn
	Mid    [3]FieldIn
	Bottom [3]FieldIn
	Winner Owner
}
