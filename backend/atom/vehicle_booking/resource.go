package vehicle_booking

import (
	"errors"
	"log"
)

// ────────────────────────────────────────────────────────────────────────────────
// Use-Case Layer – validasi & aturan domain ringan
// ────────────────────────────────────────────────────────────────────────────────

func GetAllVehiclesUsecase() ([]Vehicle, bool, error) {
	list, ok, err := GetAllVehiclesDB()
	if !ok {
		return list, ok, err
	}
	if len(list) == 0 {
		log.Println("[vehicle_booking][resource][GetAllVehiclesUsecase] kendaraan kosong")
		return list, true, errors.New("daftar kendaraan kosong")
	}
	return list, true, nil
}

func GetAllVehicleBookingUsecase() ([]VehicleBooking, bool, error) {
	list, ok, err := GetAllVehicleBookingDB()
	if !ok {
		return list, ok, err
	}
	if len(list) == 0 {
		log.Println("[vehicle_booking][resource][GetAllVehicleBookingUsecase] booking kosong")
		return list, true, errors.New("daftar booking kosong")
	}
	return list, true, nil
}

func GetAllBookingLogUsecase() ([]BookingLogs, bool, error) {
	list, ok, err := GetAllBookingLogDB()
	if !ok {
		return list, ok, err
	}
	if len(list) == 0 {
		log.Println("[vehicle_booking][resource][GetAllVehicleBookingUsecase] booking log kosong")
		return list, true, errors.New("daftar booking log kosong")
	}
	return list, true, nil
}

func CreateBookingUsecase(inputData VehicleBooking) (bool, error) {
	if inputData.VehicleID == 0 || inputData.UserID == 0 {
		return false, errors.New("vehicle_id & user_id tidak boleh kosong")
	}
	return CreateBookingDB(inputData)
}

func CreateVehicleUsecase(inputData Vehicle) (bool, error) {
	if inputData.VehicleType == "" || inputData.RegistrationNumber == "" {
		return false, errors.New("vehicle_type & registration_number wajib diisi")
	}
	return CreateVehicleDB(inputData)
}

func UpdateBookingUsecase(inputData VehicleBooking) (bool, error) {
	if inputData.BookingID == 0 || inputData.Status == "" {
		return false, errors.New("id & status wajib diisi")
	}
	return UpdateBookingDB(inputData)
}

func UpdateVehicleUsecase(inputData Vehicle) (bool, error) {
	if inputData.VehicleID == 0 || inputData.RegistrationNumber == "" {
		return false, errors.New("id kendaraan wajib diisi")
	}
	return UpdateVehicleDB(inputData)
}
