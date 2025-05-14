package vehicle_booking

import "time"

// User model
type User struct {
	UserID    int    `json:"user_id"`
	Username  string `json:"username"`
	Password  string `json:"password"`
	Role      string `json:"role"`
	CreatedAt string `json:"created_at"`
}

// Vehicle model
type Vehicle struct {
	VehicleID          int     `json:"vehicle_id"`
	VehicleType        string  `json:"vehicle_type"`
	Brand              string  `json:"brand"`
	Model              string  `json:"model"`
	RegistrationNumber string  `json:"registration_number"`
	FuelConsumption    float64 `json:"fuel_consumption"`
	ServiceSchedule    string  `json:"service_schedule"`
	CreatedAt          string  `json:"created_at"`
}

// VehicleBooking model
type VehicleBooking struct {
	BookingID  int       `json:"booking_id"`
	VehicleID  int       `json:"vehicle_id"`
	UserID     int       `json:"user_id"`
	StartDate  time.Time `json:"start_date"`
	EndDate    time.Time `json:"end_date"`
	Purpose    string    `json:"purpose"`
	Status     string    `json:"status"`
	ApproverID int       `json:"approver_id"`
	CreatedAt  time.Time `json:"created_at"`
	IsActive   int       `json:"is_active"`
}

// BookingLogs model
type BookingLogs struct {
	LogID      int       `json:"log_id"`
	BookingID  int       `json:"booking_id"`
	Status     string    `json:"status"`
	ActionBy   int       `json:"action_by"`
	ActionDate time.Time `json:"action_date"`
}

// BookingLogs model
type BookingExcel struct {
	BookingID          int       `json:"booking_id"`
	Username           string    `json:"username"`
	VehicleType        string    `json:"vehicle_type"`
	Brand              string    `json:"brand"`
	Model              string    `json:"model"`
	RegistrationNumber string    `json:"registration_number"`
	StartDate          time.Time `json:"start_date"`
	EndDate            time.Time `json:"end_date"`
	Purpose            string    `json:"purpose"`
	Status             string    `json:"status"`
	ApproverName       string    `json:"approver_name"`
}
