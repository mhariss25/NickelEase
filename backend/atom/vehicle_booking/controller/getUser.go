package vehicle_booking

import (
	"net/http"

	"NickelEase/atom/vehicle_booking"

	"github.com/gin-gonic/gin"
)

func GetAllUser(ctx *gin.Context) {
	list, ok, err := vehicle_booking.GetAllUserUsecase()
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
		"data":    list,
		"message": "Success Get All User"})
}
