# Game engine: functions backend needs

```go
// field =  0-8, cell = 0-8 (0 top-left, 8 bottom-right)

// approx returns
var (
	ErrBadPlayer   = errors.New("player must be X or O")
	ErrGameOver    = errors.New("game is already over")
	ErrNotYourTurn = errors.New("not your turn")
	ErrOutOfRange  = errors.New("field and cell must be 0-8")
	ErrWrongField  = errors.New("you can't play in this field")
	ErrCellTaken   = errors.New("cell is already taken")
)

// Inside is up to you (board, turn, allowed field, winner...)
type Game struct{}

// Empty board, first is first one to make move (x or o)
func NewGame(first Owner) (*Game, error)

// Checks and makes the move. On error, g should be unchanged!
func (g *Game) MakeMove(player Owner, field, cell int) error

// Whose turn. if it sees game over you can return ownerless
func (g *Game) CurrentPlayer() Owner

// over=false: playing | over=true + Cross/Circle: winner | over=true + Ownerless: draw
func (g *Game) Result() (over bool, winner Owner)

// no need to make it now,  I have no clue will frontent needs this
func (g *Game) Snapshot() State

// Picks a legal move for current player. Must NOT change g
func (g *Game) AIGetMove() (field, cell int)


type State struct {
	Fields [9]FieldState// Up to you i just wrote random struct name 
	Turn   Owner
	Over   bool
	Winner Owner
}
```

## How backend calls it (pseudocode)

```
g = NewGame(first)

loop:
    if g.CurrentPlayer() == bot:
        field, cell = g.AIGetMove()
        g.MakeMove(bot, field, cell)
    else:
        field, cell = read move from player
        if g.MakeMove(player, field, cell) gives error:
            send error to that player
            continue


    over, winner = g.Result()
    if over:
        save result, end game
```
