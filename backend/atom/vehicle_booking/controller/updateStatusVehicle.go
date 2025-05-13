package vehicle_booking

import (
	"net/http"

	"NickelEase/atom/vehicle_booking"

	"github.com/gin-gonic/gin"
)

func UpdateStatusVehicle(ctx *gin.Context) {
	var req vehicle_booking.Vehicle
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": err.Error(),
		})
		return
	}

	ok, err := vehicle_booking.UpdateStatusVehicleUsecase(req)
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": err.Error(),
		})
		return
	}
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"status":  500,
			"data":    nil,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"status":  200,
		"data":    req,
		"message": "Status vehicle ter-update",
	})
}
