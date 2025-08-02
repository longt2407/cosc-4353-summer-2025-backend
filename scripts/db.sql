-- Disable FOREIGN KEY check


SET FOREIGN_KEY_CHECKS = 0;


-- Create Tables


DROP TABLE IF EXISTS `volunteer`;
CREATE TABLE `volunteer` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(255) NOT NULL UNIQUE,
   `password` LONGTEXT NOT NULL,
   `reset_password_question` LONGTEXT NOT NULL,
   `reset_password_answer` LONGTEXT NOT NULL,
   `first_name` VARCHAR(50) NOT NULL,
   `middle_name` VARCHAR(50),
   `last_name` VARCHAR(50) NOT NULL,
   `address_1` VARCHAR(100) NOT NULL,
   `address_2` VARCHAR(100),
   `address_city` VARCHAR(100) NOT NULL,
   `address_state` VARCHAR(2) NOT NULL,
   `address_zip` VARCHAR(9) NOT NULL,
   `skill` LONGTEXT NOT NULL, -- JSON
   `preference` LONGTEXT,
   `availability` LONGTEXT NOT NULL, -- JSON
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `volunteer-check-email` CHECK (`email` REGEXP '^.+@.+$'),
   CONSTRAINT `volunteer-check-full_name` CHECK ((CHAR_LENGTH(`first_name`) + CHAR_LENGTH(`middle_name`) + CHAR_LENGTH(`last_name`)) <= 50),
   CONSTRAINT `volunteer-check-address_state` CHECK (CHAR_LENGTH(`address_state`) = 2),
   CONSTRAINT `volunteer-check-address_zip` CHECK (CHAR_LENGTH(`address_zip`) IN (5, 9))
);


DROP TABLE IF EXISTS `volunteer_verification`;
CREATE TABLE `volunteer_verification` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(255) NOT NULL UNIQUE,
   `password` LONGTEXT NOT NULL,
   `reset_password_question` LONGTEXT NOT NULL,
   `reset_password_answer` LONGTEXT NOT NULL,
   `token` VARCHAR(512) NOT NULL UNIQUE,
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `volunteer_verification-check-email` CHECK (`email` REGEXP '^.+@.+$')
);


DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(255) NOT NULL UNIQUE,
   `password` LONGTEXT NOT NULL,
   `reset_password_question` LONGTEXT NOT NULL,
   `reset_password_answer` LONGTEXT NOT NULL,
   `first_name` VARCHAR(50) NOT NULL,
   `middle_name` VARCHAR(50),
   `last_name` VARCHAR(50) NOT NULL,
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `admin-check-email` CHECK (`email` REGEXP '^.+@.+$'),
   CONSTRAINT `admin-check-full_name` CHECK ((CHAR_LENGTH(`first_name`) + CHAR_LENGTH(`middle_name`) + CHAR_LENGTH(`last_name`)) <= 50)
);


DROP TABLE IF EXISTS `admin_verification`;
CREATE TABLE `admin_verification` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `email` VARCHAR(255) NOT NULL UNIQUE,
   `password` LONGTEXT NOT NULL,
   `reset_password_question` LONGTEXT NOT NULL,
   `reset_password_answer` LONGTEXT NOT NULL,
   `token` VARCHAR(512) NOT NULL UNIQUE,
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `admin_verification-check-email` CHECK (`email` REGEXP '^.+@.+$')
);


DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `admin_id` INT NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `description` LONGTEXT NOT NULL,
   `location` LONGTEXT NOT NULL,
   `skill` LONGTEXT NOT NULL, -- JSON
   `urgency` INT NOT NULL, -- 0: low, 1: medium, 2: high
   `date` TIMESTAMP NOT NULL,
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `event-fk-admin_id-admin-id` FOREIGN KEY (`admin_id`) REFERENCES `admin`(`id`)
);


DROP TABLE IF EXISTS `volunteer_event`;
CREATE TABLE `volunteer_event` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `volunteer_id` INT NOT NULL,
   `event_id` INT NOT NULL,
   `status` INT NOT NULL, -- 0: assigned, 1: participated, 2: no-show
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `volunteer_event-unique-volunteer_id-event_id` UNIQUE (`volunteer_id`, `event_id`),
   CONSTRAINT `volunteer_event-fk-volunteer_id-volunteer-id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer`(`id`),
   CONSTRAINT `volunteer_event-fk-event_id-event-id` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`)
);


DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
   `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   `volunteer_id` INT NOT NULL,
   `type` INT DEFAULT 0, -- 0: info, 1: success, 2: warning, 3: error
   `title` LONGTEXT NOT NULL,
   `message` LONGTEXT,
   `status` INT NOT NULL DEFAULT 0, -- 0: unread, 1: read
   `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   `deleted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   `is_deleted` BOOLEAN NOT NULL DEFAULT false,
   CONSTRAINT `notification-fk-volunteer_id-volunteer-id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer`(`id`)
);


DROP TABLE IF EXISTS `volunteer_history`;
CREATE TABLE `volunteer_history` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `volunteer_id` INT NOT NULL,
    `event_id` INT NOT NULL,
    `type` ENUM('assigned', 'participated', 'no-show') NOT NULL,
    `date` DATE NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `volunteer_history-fk-volunteer_id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer`(`id`),
    CONSTRAINT `volunteer_history-fk-event_id` FOREIGN KEY (`event_id`) REFERENCES `event`(`id`)
);




-- Enable FOREIGN KEY check

SET FOREIGN_KEY_CHECKS = 1;