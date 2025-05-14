package routes

import (
	"NickelEase/atom/auth/controller"
	vehicle_booking "NickelEase/routes/vehicle_booking"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	route := gin.Default()

	// Setup session middleware
	store := cookie.NewStore([]byte("super_secret_key"))
	route.Use(sessions.Sessions("user_attempts", store))

	// Setup CORS middleware
	route.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*", "http://localhost:3000"},
		AllowMethods:  []string{"POST", "PUT", "PATCH", "DELETE", "GET", "OPTIONS", "TRACE", "CONNECT"},
		AllowHeaders:  []string{"Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Origin", "Content-Type", "Content-Length", "Date", "origin", "Origins", "x-requested-with", "access-control-allow-methods", "apikey"},
		ExposeHeaders: []string{"Content-Length"},
	}))

	auth := route.Group("/auth")
	{
		auth.POST("/login", controller.Login)
		auth.POST("/register", controller.Register)
	}

	// Definisikan rute kendaraan dan pemesanan
	vehicle_booking.VehicleBookingRoutes(route)

	return route
}
