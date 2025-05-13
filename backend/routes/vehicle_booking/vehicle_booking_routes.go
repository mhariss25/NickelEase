package vehicle_booking

import (
	vehicle_booking "NickelEase/atom/vehicle_booking/controller"

	"github.com/gin-gonic/gin"
)

func VehicleBookingRoutes(route *gin.Engine) {
	vehicleBooking := route.Group("/vehicle-booking")

	// Rute untuk kendaraan dan pemesanan
	vehicleBooking.GET("/get-vehicles", vehicle_booking.GetAllVehicles)
	vehicleBooking.GET("/get-booking", vehicle_booking.GetAllVehicleBooking)
	vehicleBooking.GET("/get-bookinglog", vehicle_booking.GetAllBookingLog)
	vehicleBooking.GET("/get-bookingexcel", vehicle_booking.GetBookingExcel)
	vehicleBooking.POST("/post-vehicle", vehicle_booking.CreateVehicle)
	vehicleBooking.POST("/post-booking", vehicle_booking.CreateBooking)
	vehicleBooking.PUT("/put-vehicle", vehicle_booking.UpdateVehicle)
	vehicleBooking.PUT("/put-booking", vehicle_booking.UpdateBooking)
	vehicleBooking.PUT("/put-approve-booking", vehicle_booking.UpdateApproveBooking)
	vehicleBooking.PUT("/put-status-vehicle", vehicle_booking.UpdateStatusVehicle)
	vehicleBooking.PUT("/put-status-booking", vehicle_booking.UpdateStatusBooking)
}
