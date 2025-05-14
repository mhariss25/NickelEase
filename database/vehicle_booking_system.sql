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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.booking_logs: ~15 rows (approximately)
INSERT INTO `booking_logs` (`log_id`, `booking_id`, `status`, `action_by`, `action_date`) VALUES
	(1, 3, 'approved', 5, '2025-05-11 13:45:50'),
	(3, 5, 'approved', 5, '2025-05-11 14:26:23'),
	(4, 6, 'approved', 5, '2025-05-11 14:28:31'),
	(5, 7, 'rejected', 5, '2025-05-11 14:28:39'),
	(6, 8, 'rejected', 5, '2025-05-11 14:28:40'),
	(7, 9, 'rejected', 5, '2025-05-11 14:29:29'),
	(8, 9, 'approved', 5, '2025-05-12 03:45:07'),
	(9, 10, 'approved', 5, '2025-05-12 04:09:53'),
	(10, 10, 'rejected', 5, '2025-05-12 04:10:11'),
	(11, 10, 'rejected', 5, '2025-05-12 04:11:30'),
	(12, 10, 'rejected', 5, '2025-05-12 05:51:22'),
	(13, 10, 'rejected', 5, '2025-05-12 06:40:17'),
	(14, 10, 'rejected', 5, '2025-05-12 06:47:47'),
	(15, 10, 'rejected', 5, '2025-05-13 20:11:17'),
	(16, 10, 'rejected', 5, '2025-05-13 20:57:33');

-- Dumping structure for table vehicle_booking_system.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','approver') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.users: ~5 rows (approximately)
INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `created_at`) VALUES
	(4, 'Admin1', '$2a$10$rcLkST.ev2RW4jpqBFrrH.JQt.2aUiFDu7ZWpwzguIUjULax.86TW', 'admin', '2025-05-14 04:53:35'),
	(5, 'Approver1', '$2a$10$BjGU8k4hL8Ps0Q7C7Igr8et9EcPInN0XrQlW85cXMRBgaliiDwkAe', 'approver', '2025-05-14 04:56:28'),
	(6, 'Admin2', '$2a$10$tORbiTVoI3AY7Wt3EOpBHeaE874VPn5ENlYIm0f1HmjO/3soAc/1q', 'admin', '2025-05-14 08:55:25'),
	(7, 'Admin3', '$2a$10$smbL8sYUveMuSgumdmhmDOBMaqc4.fO5nnBZUmHH9sQoqHlJU3/WC', 'admin', '2025-05-14 08:55:28'),
	(8, 'Admin4', '$2a$10$O6fvSt85uvAyXAUW.caaj.QmEonpuwq036FAykuu7.LJtyCrAFCDu', 'admin', '2025-05-14 08:55:34');

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
  `is_active` int DEFAULT '1',
  PRIMARY KEY (`vehicle_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.vehicles: ~31 rows (approximately)
INSERT INTO `vehicles` (`vehicle_id`, `vehicle_type`, `brand`, `model`, `registration_number`, `fuel_consumption`, `service_schedule`, `created_at`, `is_active`) VALUES
	(1, 'passenger', 'Toyota', 'Hiace', 'AB123CD', 10.60, '2025-04-30', '2025-05-11 13:11:39', 0),
	(2, 'passenger', 'Honda', 'Brio', 'AC321BD', 12.50, '2025-05-01', '2025-05-11 14:10:29', 1),
	(3, 'passenger', 'Honda', 'CR-V', 'AD321CB', 7.00, '2025-05-01', '2025-05-12 05:47:57', 1),
	(4, 'passenger', 'Honda', 'WR-V', 'AE321AE', 6.00, '2025-05-01', '2025-05-12 06:40:09', 1),
	(5, 'passenger', 'Toyota', 'Innova', 'B1234XYZ', 12.50, '2025-05-02', '2025-05-13 11:25:59', 1),
	(6, 'cargo', 'Hino', '500', 'B5678ABC', 7.80, '2025-05-02', '2025-05-13 11:25:59', 1),
	(7, 'passenger', 'Honda', 'CR-V', 'B9876DEF', 10.20, '2025-05-02', '2025-05-13 11:25:59', 1),
	(8, 'cargo', 'Isuzu', 'Elf', 'B1239QWE', 8.50, '2025-05-03', '2025-05-13 11:25:59', 1),
	(9, 'passenger', 'Mitsubishi', 'Outlander', 'B4561RTY', 11.30, '2025-05-03', '2025-05-13 11:25:59', 1),
	(10, 'cargo', 'Suzuki', 'Carry', 'B6573LMN', 9.00, '2025-05-03', '2025-05-13 11:25:59', 1),
	(11, 'passenger', 'Nissan', 'X-Trail', 'B4321POI', 9.80, '2025-05-04', '2025-05-13 11:25:59', 1),
	(12, 'cargo', 'Toyota', 'Dyna', 'B7890VBN', 7.20, '2025-05-04', '2025-05-13 11:25:59', 1),
	(13, 'passenger', 'Ford', 'Ecosport', 'B3456XPO', 10.00, '2025-05-04', '2025-05-13 11:25:59', 1),
	(14, 'cargo', 'Mitsubishi', 'Fuso', 'B8765JSJ', 8.10, '2025-05-05', '2025-05-13 11:25:59', 1),
	(15, 'passenger', 'BMW', 'X5', 'B2345ABC', 12.00, '2025-05-05', '2025-05-13 11:25:59', 1),
	(16, 'cargo', 'Hino', '300', 'B3457RTG', 7.50, '2025-05-05', '2025-05-13 11:25:59', 1),
	(17, 'passenger', 'Chevrolet', 'Trax', 'B8764VNM', 10.60, '2025-05-06', '2025-05-13 11:25:59', 1),
	(18, 'cargo', 'Hyundai', 'Starex', 'B5423TUR', 8.20, '2025-05-06', '2025-05-13 11:25:59', 1),
	(19, 'passenger', 'Kia', 'Seltos', 'B6578NTR', 11.00, '2025-05-07', '2025-05-13 11:25:59', 1),
	(20, 'cargo', 'Mercedes', 'Sprinter', 'B4653TNE', 6.50, '2025-05-07', '2025-05-13 11:25:59', 1),
	(21, 'passenger', 'Audi', 'Q7', 'B9812KKO', 13.00, '2025-05-08', '2025-05-13 11:25:59', 1),
	(22, 'cargo', 'Isuzu', 'Giga', 'B3487WAE', 7.60, '2025-05-08', '2025-05-13 11:25:59', 1),
	(23, 'passenger', 'Volkswagen', 'Tiguan', 'B2348POR', 9.20, '2025-05-08', '2025-05-13 11:25:59', 1),
	(24, 'cargo', 'Toyota', 'Hiace', 'B3459BWI', 8.00, '2025-05-09', '2025-05-13 11:25:59', 1),
	(25, 'cargo', 'Mercedes-Benz', 'Actros', 'AD321CB', 50.50, '2025-05-09', '2025-05-13 15:06:39', 1),
	(26, 'cargo', 'Mercedes-Benz', 'Unimog', 'B123AE', 40.30, '2025-05-08', '2025-05-13 15:11:46', 1),
	(27, 'cargo', 'Mercedes-Benz', 'Axor', 'B524E', 30.50, '2025-05-09', '2025-05-13 15:13:19', 1),
	(28, 'cargo', 'Toyota', 'Toyota Dyna', 'B1239B', 30.10, '2025-05-09', '2025-05-13 15:17:15', 1),
	(29, 'cargo', 'Toyota', 'Toyota Hilux', 'B9213A', 20.50, '2025-05-09', '2025-05-13 15:27:25', 1),
	(30, 'cargo', 'Toyota', 'Toyota Hiace', 'B5192G', 21.40, '2025-05-10', '2025-05-13 15:28:55', 1),
	(31, 'passenger', 'Honda', 'Civic', 'AE2025EA', 10.00, '2025-05-10', '2025-05-13 19:41:31', 1);

-- Dumping structure for table vehicle_booking_system.vehicle_bookings
CREATE TABLE IF NOT EXISTS `vehicle_bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `vehicle_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `purpose` varchar(255) DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `approver_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` int DEFAULT '1',
  PRIMARY KEY (`booking_id`) USING BTREE,
  KEY `vehicle_id` (`vehicle_id`),
  KEY `user_id` (`user_id`),
  KEY `approver_id` (`approver_id`),
  CONSTRAINT `vehicle_bookings_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`),
  CONSTRAINT `vehicle_bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `vehicle_bookings_ibfk_3` FOREIGN KEY (`approver_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table vehicle_booking_system.vehicle_bookings: ~7 rows (approximately)
INSERT INTO `vehicle_bookings` (`booking_id`, `vehicle_id`, `user_id`, `start_date`, `end_date`, `purpose`, `status`, `approver_id`, `created_at`, `is_active`) VALUES
	(3, 1, 4, '2025-05-15', '2025-05-15', 'Meeting with client', 'accepted', 5, '2025-05-11 13:12:43', 1),
	(5, 2, 6, '2025-05-15', '2025-05-15', 'Meeting with supervisor', 'rejected', 5, '2025-05-11 14:12:37', 1),
	(6, 3, 7, '2025-05-15', '2025-05-15', 'Meeting with manager', 'rejected', 5, '2025-05-11 14:13:07', 1),
	(7, 4, 7, '2025-05-15', '2025-05-15', 'Meeting with supervisor', 'pending', 5, '2025-05-12 04:35:27', 1),
	(8, 5, 8, '2025-05-15', '2025-05-15', 'Meeting with supervisor', 'rejected', 5, '2025-05-12 05:46:45', 1),
	(9, 6, 4, '2025-05-15', '2025-05-15', 'Meeting with user', 'rejected', 5, '2025-05-12 06:39:57', 1),
	(10, 7, 4, '2025-05-15', '2025-05-17', 'Meeting with founder', 'rejected', 5, '2025-05-13 19:40:00', 1),
	(12, 10, 4, '2025-05-13', '2025-05-14', 'Transporting nickel to other cities', 'pending', 5, '2025-05-14 16:41:41', 1),
	(13, 31, 4, '2025-05-15', '2025-05-15', 'Meeting with engineer', 'pending', 5, '2025-05-14 17:47:36', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
