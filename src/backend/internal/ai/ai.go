package ai

type Level int

// Rather than probing for iterations there should be levels
// Users of the ai do not need to know about the concept of iterations
const (
	LvlNoob     Level = iota // Random valid moves
	LvlBeginner              // Pseudo random (wins small boards, blocks small board wins, etc)
	LvlAmateur               // MCTS with 100 iterations
	LvlPro                   // MCTS with 1000 iterations
	LvlGod                   // MCST with 10000 iterations
)
