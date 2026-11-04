package database

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"time"

	"gorm.io/gorm"
)

const sessiontTTL = 7 * 24 * time.Hour

var ErrSessionInvalid = errors.New(("session expired or invalid"))

func generateToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil { //fills 32 raw bythen gathered from /dev/urandom
		return "", err
	}
	return base64.URLEncoding.EncodeToString(b), nil //changes to URL/cccokie safe string (because urandom could return stuff not suitable- bull bytes, newlines...)
}

func CreateSession(userID string) (string, error) {
	token, err := generateToken()
	if err != nil {
		return "", err
	}
	session := Session{
		Token:     token,
		UserID:    userID,
		ExpiresAt: time.Now().Add(sessiontTTL),
	}
	if err := DB.Create(&session).Error; err != nil {
		return "", err
	}
	return token, nil
}

func LookupSession(token string) (string, error) {
	var session Session

	if err := DB.First(&session, "token = ?", token).Error; err != nil { // * always use .First for 1 row
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return "", ErrSessionInvalid
		}
		return "", err
	}
	if session.ExpiresAt.Before(time.Now()) {
		return "", ErrSessionInvalid
	}
	return session.UserID, nil
}

func DeleteSession(token string) error {
	return DB.Where("token = ?", token).Delete(&Session{}).Error
}
