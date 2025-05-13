package vehicle_booking

import (
	"net/http"

	"NickelEase/atom/vehicle_booking"

	"github.com/gin-gonic/gin"
)

func CreateBooking(ctx *gin.Context) {
	var req vehicle_booking.VehicleBooking
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"status":  400,
			"data":    nil,
			"message": err.Error(),
		})
		return
	}

	ok, err := vehicle_booking.CreateBookingUsecase(req)
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

	ctx.JSON(http.StatusCreated, gin.H{
		"status":  201,
		"data":    req,
		"message": "Booking berhasil dibuat",
	})
}
