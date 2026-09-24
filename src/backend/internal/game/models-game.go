package game

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
	top    [3]int
	mid    [3]int
	bottom [3]int
	Owner Owner
}

type FieldOut struct {
	top    [3]FieldIn
	mid    [3]FieldIn
	bottom [3]FieldIn
	Owner Owner
}
