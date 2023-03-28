SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
START TRANSACTION;
SET time_zone = '+00:00';

CREATE TABLE `activities` (
	`id` int(5) NOT NULL AUTO_INCREMENT,
	`user_id` int(5) NOT NULL,
	`activity_info` longtext NOT NULL,
	PRIMARY KEY (`id`),
	KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
	`id` int(5) NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`password` text NOT NULL,
	`permission_level` int(1) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `username` (`username`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO users (username, password, permission_level) VALUES ('wwtwwwwwwwwu', 'aowwwwweqwqywwpatpayqaywaye', 2); 

ALTER TABLE `activities`
	ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `activities`
	MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
	MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

COMMIT;