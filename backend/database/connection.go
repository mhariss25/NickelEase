package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

// InitDB initializes the database connection
func InitDB() *sql.DB {
	// Update connection string to use 'root' without password
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/vehicle_booking_system?parseTime=true&loc=Local")
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error pinging database: ", err)
	}

	return db
}
