package database

import
(
	"time"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type PlaySymbol string
const
(
	SymbolX PlaySymbol = "X"
	SymbolO PlaySymbol = "O"
)

type GameStatus string
const
(
	StatusInProgress	GameStatus = "IN_PROGRESS"
	StatusFinishedWin	GameStatus = "FINISHED_WIN"
	StatusFinishedDraw	GameStatus = "FINISHED_DRAW"
)

type FriendStatus string
const
(
	FriendPending	FriendStatus = "PENDING"
	FriendAccepted	FriendStatus = "ACCEPTED"
	FriendRejected	FriendStatus = "REJECTED"
)

type User struct
{
	ID			string  `gorm:"primaryKey"`
	Username	string  `gorm:"unique;not null"`
	Email		string  `gorm:"unique;not null"`
	PassHash	string  `gorm:"not null"`
	ProfileURL	*string // as pointer can be null!!!
	UserSymbol	PlaySymbol `gorm:"not null"`
	CreatedAt	time.Time
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error)
{
	if u.ID == ""
	{
		u.ID = uuid.New().String()
	}
	return
}

type GameStats struct
{
	UserID			string `gorm:"primaryKey"`
	User			User   `gorm:"foreignKey:UserID"`
	TotalMatches	int    `gorm:"default:0"`
	Wins			int    `gorm:"default:0"`
	Losses			int    `gorm:"default:0"`
	Draws			int    `gorm:"default:0"`
	CurrentStreak	int    `gorm:"default:0"`
	CreatedAt		time.Time
}

type Game struct
{
	ID				string		`gorm:"primaryKey"`
	Player1ID		string
	Player1			User		`gorm:"foreignKey:Player1ID"`
	Player2ID		string
	Player2			User		`gorm:"foreignKey:Player2ID"`
	Player1Symbol	PlaySymbol	`gorm:"not null"`
	WinnerID		*string
	Winner			*User		`gorm:"foreignKey:WinnerID"`
	Status			GameStatus	`gorm:"not null"`
	CreatedAt		time.Time
	FinishedAt		*time.Time
}

func (g *Game) BeforeCreate(tx *gorm.DB) (err error)
{
	if g.ID == ""
	{
		g.ID = uuid.New().String()
	}
	return
}

type Message struct
{
	ID			string `gorm:"primaryKey"`
	Content		string `gorm:"not null"`
	SenderID	string
	Sender		User `gorm:"foreignKey:SenderID"`
	ReceiverID	string
	Receiver	User `gorm:"foreignKey:ReceiverID"`
	CreatedAt	time.Time
}

func (m *Message) BeforeCreate(tx *gorm.DB) (err error)
{
	if m.ID == ""
	{
		m.ID = uuid.New().String()
	}
	return
}

type Friend struct
{
	ID			string       `gorm:"primaryKey"`
	User1ID		string
	User1		User         `gorm:"foreignKey:User1ID"`
	User2ID		string
	User2		User         `gorm:"foreignKey:User2ID"`
	Status		FriendStatus `gorm:"not null"`
	CreatedAt	time.Time
}

func (f *Friend) BeforeCreate(tx *gorm.DB) (err error)
{
	if f.ID == ""
	{
		f.ID = uuid.New().String()
	}
	return
}
