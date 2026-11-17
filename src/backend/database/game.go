package database

import "time"

func CreateGame(player1ID, player2ID, symbol1 string, symbol2 string) (string, error) {

	game := Game{
		Player1ID:     player1ID,
		Player2ID:     player2ID,
		Player1Symbol: PlaySymbol(symbol1),
		Status:        StatusInProgress,
	}
	if err := DB.Create(&game).Error; err != nil {
		return "", err
	}
	return game.ID, nil
}

func FinishGame(gameID string, winnerID *string) error {
	status := StatusFinishedDraw
	if winnerID != nil {
		status = StatusFinishedWin
	}
	now := time.Now()

	return DB.Model(&Game{}).Where("id = ?", gameID).Updates(Game{
		Status:     status,
		WinnerID:   winnerID,
		FinishedAt: &now,
	}).Error
}
