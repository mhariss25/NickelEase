-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for vehicle_booking_system
CREATE DATABASE IF NOT EXISTS `vehicle_booking_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vehicle_booking_system`;

-- Dumping structure for table vehicle_booking_system.booking_logs
CREATE TABLE IF NOT EXISTS `booking_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `action_by` int DEFAULT NULL,
  `action_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`) USING BTREE,
  KEY `booking_id` (`booking_id`),
  KEY `action_by` (`action_by`),
  CONSTRAINT `booking_logs_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `vehicle_bookings` (`booking_id`),
  CONSTRAINT `booking_logs_ibfk_2` FOREIGN KEY (`action_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.booking_logs: ~12 rows (approximately)
INSERT INTO `booking_logs` (`log_id`, `booking_id`, `status`, `action_by`, `action_date`) VALUES
	(1, 3, 'approved', 1, '2025-05-11 13:45:50'),
	(3, 6, 'approved', 2, '2025-05-11 14:26:23'),
	(4, 6, 'approved', 2, '2025-05-11 14:28:31'),
	(5, 6, 'rejected', 2, '2025-05-11 14:28:39'),
	(6, 6, 'rejected', 2, '2025-05-11 14:28:40'),
	(7, 5, 'rejected', 2, '2025-05-11 14:29:29'),
	(8, 5, 'approved', 2, '2025-05-12 03:45:07'),
	(9, 5, 'approved', 2, '2025-05-12 04:09:53'),
	(10, 5, 'rejected', 2, '2025-05-12 04:10:11'),
	(11, 5, 'rejected', 3, '2025-05-12 04:11:30'),
	(12, 8, 'rejected', 3, '2025-05-12 05:51:22'),
	(13, 8, 'rejected', 3, '2025-05-12 06:40:17'),
	(14, 9, 'rejected', 3, '2025-05-12 06:47:47');

-- Dumping structure for table vehicle_booking_system.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','approver') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.users: ~3 rows (approximately)
INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `created_at`) VALUES
	(1, 'admin1', 'adm123', 'admin', '2025-05-11 12:28:21'),
	(2, 'admin2', 'adm123', 'admin', '2025-05-11 12:28:21'),
	(3, 'approver', 'app123', 'approver', '2025-05-11 12:28:21');

-- Dumping structure for table vehicle_booking_system.vehicles
CREATE TABLE IF NOT EXISTS `vehicles` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `fuel_consumption` decimal(5,2) DEFAULT NULL,
  `service_schedule` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vehicle_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.vehicles: ~2 rows (approximately)
INSERT INTO `vehicles` (`vehicle_id`, `vehicle_type`, `brand`, `model`, `registration_number`, `fuel_consumption`, `service_schedule`, `created_at`) VALUES
	(1, 'passenger', 'Toyota', 'Hiace', 'AB123CD', 10.50, '2025-05-01', '2025-05-11 13:11:39'),
	(2, 'passenger', 'Honda', 'Brio', 'AC321BD', 12.50, '2025-05-01', '2025-05-11 14:10:29'),
	(3, 'passenger', 'Honda', 'CR-V', 'AD321CB', 7.00, '2025-05-01', '2025-05-12 05:47:57'),
	(4, 'passenger', 'Honda', 'WR-V', 'AE321AE', 6.00, '2025-05-01', '2025-05-12 06:40:09'),
	(5, 'passenger', 'Toyota', 'Innova', 'B1234XYZ', 12.50, '2025-05-02', '2025-05-13 11:25:59'),
	(6, 'cargo', 'Hino', '500', 'B5678ABC', 7.80, '2025-05-02', '2025-05-13 11:25:59'),
	(7, 'passenger', 'Honda', 'CR-V', 'B9876DEF', 10.20, '2025-05-02', '2025-05-13 11:25:59'),
	(8, 'cargo', 'Isuzu', 'Elf', 'B1239QWE', 8.50, '2025-05-03', '2025-05-13 11:25:59'),
	(9, 'passenger', 'Mitsubishi', 'Outlander', 'B4561RTY', 11.30, '2025-05-03', '2025-05-13 11:25:59'),
	(10, 'cargo', 'Suzuki', 'Carry', 'B6573LMN', 9.00, '2025-05-03', '2025-05-13 11:25:59'),
	(11, 'passenger', 'Nissan', 'X-Trail', 'B4321POI', 9.80, '2025-05-04', '2025-05-13 11:25:59'),
	(12, 'cargo', 'Toyota', 'Dyna', 'B7890VBN', 7.20, '2025-05-04', '2025-05-13 11:25:59'),
	(13, 'passenger', 'Ford', 'Ecosport', 'B3456XPO', 10.00, '2025-05-04', '2025-05-13 11:25:59'),
	(14, 'cargo', 'Mitsubishi', 'Fuso', 'B8765JSJ', 8.10, '2025-05-05', '2025-05-13 11:25:59'),
	(15, 'passenger', 'BMW', 'X5', 'B2345ABC', 12.00, '2025-05-05', '2025-05-13 11:25:59'),
	(16, 'cargo', 'Hino', '300', 'B3457RTG', 7.50, '2025-05-05', '2025-05-13 11:25:59'),
	(17, 'passenger', 'Chevrolet', 'Trax', 'B8764VNM', 10.60, '2025-05-06', '2025-05-13 11:25:59'),
	(18, 'cargo', 'Hyundai', 'Starex', 'B5423TUR', 8.20, '2025-05-06', '2025-05-13 11:25:59'),
	(19, 'passenger', 'Kia', 'Seltos', 'B6578NTR', 11.00, '2025-05-07', '2025-05-13 11:25:59'),
	(20, 'cargo', 'Mercedes', 'Sprinter', 'B4653TNE', 6.50, '2025-05-07', '2025-05-13 11:25:59'),
	(21, 'passenger', 'Audi', 'Q7', 'B9812KKO', 13.00, '2025-05-08', '2025-05-13 11:25:59'),
	(22, 'cargo', 'Isuzu', 'Giga', 'B3487WAE', 7.60, '2025-05-08', '2025-05-13 11:25:59'),
	(23, 'passenger', 'Volkswagen', 'Tiguan', 'B2348POR', 9.20, '2025-05-08', '2025-05-13 11:25:59'),
	(24, 'cargo', 'Toyota', 'Hiace', 'B3459BWI', 8.00, '2025-05-09', '2025-05-13 11:25:59'),
	(25, 'cargo', 'Mercedes-Benz', 'Actros', 'AD321CB', 50.50, '2025-05-09', '2025-05-13 15:06:39'),
	(26, 'cargo', 'Mercedes-Benz', 'Unimog', 'B123AE', 40.30, '2025-05-08', '2025-05-13 15:11:46'),
	(27, 'cargo', 'Mercedes-Benz', 'Axor', 'B524E', 30.50, '2025-05-09', '2025-05-13 15:13:19'),
	(28, 'cargo', 'Toyota', 'Toyota Dyna', 'B1239B', 30.10, '2025-05-09', '2025-05-13 15:17:15'),
	(29, 'cargo', 'Toyota', 'Toyota Hilux', 'B9213A', 20.50, '2025-05-09', '2025-05-13 15:27:25'),
	(30, 'cargo', 'Toyota', 'Toyota Hiace', 'B5192G', 21.40, '2025-05-10', '2025-05-13 15:28:55');

-- Dumping structure for table vehicle_booking_system.vehicle_bookings
CREATE TABLE IF NOT EXISTS `vehicle_bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`) USING BTREE,
  KEY `vehicle_id` (`vehicle_id`),
  KEY `user_id` (`user_id`),
  KEY `approver_id` (`approver_id`),
  CONSTRAINT `vehicle_bookings_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`),
  CONSTRAINT `vehicle_bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `vehicle_bookings_ibfk_3` FOREIGN KEY (`approver_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.vehicle_bookings: ~5 rows (approximately)
INSERT INTO `vehicle_bookings` (`booking_id`, `vehicle_id`, `user_id`, `start_date`, `end_date`, `purpose`, `status`, `approver_id`, `created_at`) VALUES
	(3, 1, 2, '2025-05-15 01:01:00', '2025-05-15 05:00:00', 'Meeting with client', 'approved', 3, '2025-05-11 13:12:43'),
	(5, 1, 1, '2025-05-15 02:00:00', '2025-05-15 05:00:00', 'Meeting with supervisor', 'rejected', 2, '2025-05-11 14:12:37'),
	(6, 1, 1, '2025-05-15 01:03:00', '2025-05-15 05:00:00', 'Meeting with manager', 'rejected', 2, '2025-05-11 14:13:07'),
	(7, 2, 3, '2025-05-15 01:05:00', '2025-05-15 05:00:00', 'Meeting with supervisor', 'pending', 3, '2025-05-12 04:35:27'),
	(8, 2, 3, '2025-05-15 05:00:00', '2025-05-15 05:00:00', 'Meeting with supervisor', 'rejected', 3, '2025-05-12 05:46:45'),
	(9, 3, 2, '2025-05-15 03:00:00', '2025-05-15 05:00:00', 'Meeting with user', 'rejected', 3, '2025-05-12 06:39:57');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
