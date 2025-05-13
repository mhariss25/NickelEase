package vehicle_booking

import (
	"log"

	"NickelEase/database"
)

// ────────────────────────────────────────────────────────────────────────────────
// Data-Access Layer – CRUD ke tabel vehicle_bookings & vehicles
// ────────────────────────────────────────────────────────────────────────────────

// GetAllVehiclesDB mengambil seluruh data kendaraan.
func GetAllVehiclesDB() ([]Vehicle, bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		SELECT 
			vehicle_id,
			vehicle_type,
			brand,
			model,
			registration_number,
			fuel_consumption,
			service_schedule,
			created_at
		FROM 
			vehicles
		ORDER BY
			vehicle_id ASC;
	`

	var datas []Vehicle
	rows, err := db.Query(query)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][GetAllVehiclesDB] error on query", err.Error())
		return datas, false, err
	}
	defer rows.Close()

	for rows.Next() {
		var data Vehicle
		err := rows.Scan(
			&data.VehicleID,
			&data.VehicleType,
			&data.Brand,
			&data.Model,
			&data.RegistrationNumber,
			&data.FuelConsumption,
			&data.ServiceSchedule,
			&data.CreatedAt,
		)
		if err != nil {
			log.Println("[vehicle_booking][resource_db][GetAllVehiclesDB] error on scan", err.Error())
			return datas, false, err
		}
		datas = append(datas, data)
	}

	return datas, true, nil
}

// GetAllVehicleBookingDB mengambil seluruh data kendaraan.
func GetAllVehicleBookingDB() ([]VehicleBooking, bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		SELECT 
			booking_id,
			vehicle_id,
			user_id,
			start_date,
			end_date,
			purpose,
			status,
			approver_id,
			created_at
		FROM 
			vehicle_bookings
		ORDER BY
			booking_id ASC;
	`

	var datas []VehicleBooking
	rows, err := db.Query(query)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][GetAllVehiclesDB] error on query", err.Error())
		return datas, false, err
	}
	defer rows.Close()

	for rows.Next() {
		var data VehicleBooking
		err := rows.Scan(
			&data.BookingID,
			&data.VehicleID,
			&data.UserID,
			&data.StartDate,
			&data.EndDate,
			&data.Purpose,
			&data.Status,
			&data.ApproverID,
			&data.CreatedAt,
		)
		if err != nil {
			log.Println("[vehicle_booking][resource_db][GetAllVehiclesBookingDB] error on scan", err.Error())
			return datas, false, err
		}
		datas = append(datas, data)
	}

	return datas, true, nil
}

// GetAllVehicleBookingDB mengambil seluruh data kendaraan.
func GetAllBookingLogDB() ([]BookingLogs, bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		SELECT 
			log_id,
			booking_id,
			status,
			action_by,
			action_date
		FROM 
			booking_logs
		ORDER BY
			log_id ASC;
	`

	var datas []BookingLogs
	rows, err := db.Query(query)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][GetAllBookingLogsDB] error on query", err.Error())
		return datas, false, err
	}
	defer rows.Close()

	for rows.Next() {
		var data BookingLogs
		err := rows.Scan(
			&data.LogID,
			&data.BookingID,
			&data.Status,
			&data.ActionBy,
			&data.ActionDate,
		)
		if err != nil {
			log.Println("[vehicle_booking][resource_db][GetAllBookingLogsDB] error on scan", err.Error())
			return datas, false, err
		}
		datas = append(datas, data)
	}

	return datas, true, nil
}

// CreateVehicleDB menyimpan master kendaraan baru.
func CreateVehicleDB(inputData Vehicle) (bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		INSERT INTO 
			vehicles 
			(
			vehicle_type, 
			brand, model, 
			registration_number, 
			fuel_consumption, 
			service_schedule
			)
		VALUES 
			(
				?, 
				?, 
				?, 
				?, 
				?, 
				?
			);
	`

	_, err := db.Exec(
		query,
		inputData.VehicleType,
		inputData.Brand,
		inputData.Model,
		inputData.RegistrationNumber,
		inputData.FuelConsumption,
		inputData.ServiceSchedule,
	)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][CreateVehicleDB] error on exec ", err.Error())
		return false, err
	}

	return true, nil
}

// CreateBookingDB menyimpan satu booking baru.
func CreateBookingDB(inputData VehicleBooking) (bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		INSERT INTO 
			vehicle_bookings 
			(
				vehicle_id, 
				user_id, 
				start_date, 
				end_date, 
				purpose, 
				status, 
				approver_id
			)
		VALUES 
			(
				?, 
				?, 
				?, 
				?, 
				?, 
				?, 
				?
			);
	`

	_, err := db.Exec(
		query,
		inputData.VehicleID,
		inputData.UserID,
		inputData.StartDate,
		inputData.EndDate,
		inputData.Purpose,
		inputData.Status,
		inputData.ApproverID,
	)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][CreateBookingDB] error on exec ", err.Error())
		return false, err
	}

	return true, nil
}

func UpdateVehicleDB(inputData Vehicle) (bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		UPDATE vehicles
		SET
			vehicle_type = ?, 
			brand = ?, 
			model = ?, 
			registration_number = ?, 
			fuel_consumption = ?, 
			service_schedule = ?
		WHERE
			vehicle_id = ?
	`

	_, err := db.Exec(
		query,
		inputData.VehicleType,
		inputData.Brand,
		inputData.Model,
		inputData.RegistrationNumber,
		inputData.FuelConsumption,
		inputData.ServiceSchedule,
		inputData.VehicleID,
	)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][UpdateVehicleDB] error on exec ", err.Error())
		return false, err
	}

	return true, nil
}

func UpdateBookingDB(inputData VehicleBooking) (bool, error) {
	db := database.InitDB()
	defer db.Close()

	query := `
		UPDATE 
			vehicle_bookings 
		SET 
			status=? 
		WHERE 
			booking_id=?;
	`

	_, err := db.Exec(
		query,
		inputData.Status,
		inputData.BookingID,
	)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][UpdateBookingDB] error on exec ", err.Error())
		return false, err
	}

	insLog := `
		INSERT INTO 
			booking_logs 
			(
				booking_id, 
				status, 
				action_by
			) 
		VALUES 
			(
				?, 
				?, 
				?
			);
	`

	_, err = db.Exec(
		insLog,
		inputData.BookingID,
		inputData.Status,
		inputData.UserID,
	)
	if err != nil {
		log.Println("[vehicle_booking][resource_db][UpdateBookingDB] error on log insert", err.Error())
		return false, err
	}

	return true, nil
}
