package auth

import (
	"fmt"
	"log"

	"NickelEase/database"

	"golang.org/x/crypto/bcrypt"
)

func GetUserByUsernameDB(username string) (User, bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		SELECT 
			user_id,
			username,
			password,
			role,
			created_at
		FROM 
			users
		WHERE 
			username = ?;
	`

	var user User
	err := db.QueryRow(query, username).Scan(
		&user.UserID,
		&user.Username,
		&user.Password,
		&user.Role,
		&user.CreatedAt,
	)
	if err != nil {
		log.Println("[auth][resource_db][GetUserByUsernameDB] error on scan", err.Error())
		return user, false, err
	}

	return user, true, nil
}

func ValidateRole(role string) bool {
	validRoles := []string{"admin", "approver"} // Daftar role yang valid sesuai enum di database
	for _, r := range validRoles {
		if r == role {
			return true
		}
	}
	return false
}

func CreateUserDB(inputData RegisterRequest) (bool, error) {

	if !ValidateRole(inputData.Role) {
		log.Println("[auth][resource_db][CreateUserDB] invalid role value:", inputData.Role)
		return false, fmt.Errorf("role tidak valid: %s", inputData.Role)
	}

	db := database.InitDB()
	defer db.Close()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(inputData.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Println("[auth][resource_db][CreateUserDB] error hashing password", err.Error())
		return false, err
	}

	query := `
		INSERT INTO 
			users 
			(username, password, role)
		VALUES 
			(?, ?, ?);
	`

	_, err = db.Exec(
		query,
		inputData.Username,
		string(hashedPassword),
		inputData.Role,
	)
	if err != nil {
		log.Println("[auth][resource_db][CreateUserDB] error on exec", err.Error())
		return false, err
	}

	return true, nil
}
