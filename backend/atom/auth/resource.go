package auth

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func LoginUsecase(inputData LoginRequest) (LoginResponse, bool, error) {
	var response LoginResponse

	user, ok, err := GetUserByUsernameDB(inputData.Username)
	if !ok || err != nil {
		return response, false, errors.New("username tidak ditemukan")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(inputData.Password))
	if err != nil {
		return response, false, errors.New("password salah")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.UserID,
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token berlaku 24 jam
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return response, false, errors.New("gagal membuat token")
	}

	response.Token = tokenString
	response.Username = user.Username
	response.Role = user.Role

	return response, true, nil
}

func RegisterUsecase(inputData RegisterRequest) (bool, error) {

	_, ok, _ := GetUserByUsernameDB(inputData.Username)
	if ok {
		return false, errors.New("username sudah digunakan")
	}

	if inputData.Role != "admin" && inputData.Role != "approver" {
		return false, errors.New("role tidak valid")
	}

	ok, err := CreateUserDB(inputData)
	if !ok || err != nil {
		return false, errors.New("gagal membuat user baru")
	}

	return true, nil
}
