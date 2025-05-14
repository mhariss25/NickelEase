package controller

import (
	"net/http"

	"NickelEase/atom/auth"

	"github.com/gin-gonic/gin"
)

func Login(ctx *gin.Context) {
	var request auth.LoginRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": "Data tidak valid"})
		return
	}

	response, ok, err := auth.LoginUsecase(request)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": err.Error()})
		return
	}
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  500,
			"data":    nil,
			"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  200,
		"data":    response,
		"message": "Login berhasil"})
}

func Register(ctx *gin.Context) {
	var request auth.RegisterRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": "Data tidak valid"})
		return
	}

	ok, err := auth.RegisterUsecase(request)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": err.Error()})
		return
	}
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  500,
			"data":    nil,
			"message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  200,
		"data":    nil,
		"message": "Registrasi berhasil"})
}
