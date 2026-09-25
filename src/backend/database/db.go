package database

import
(
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB()
{
	dsn := fmt.Sprintf
	(
		"host=db user=%s password=%s dbname=%s port=5432 sslmode=disable",
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB"),
	)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config
	{
		TranslateError: true,
	})
	if err != nil
	{
		log.Fatal("could not connect to the database: ", err)
	}

	err = db.AutoMigrate(&User{}, &GameStats{}, &Game{}, &Message{}, &Friend{})
	if err != nil
	{
		log.Fatal("database migrations fail: ", err)
	}

	DB = db
	log.Println("database connected: success")
}
