SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

CREATE TABLE collections (
  id INT(5) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO collections(collections.name) VALUES ('none');
INSERT INTO collections(collections.name) VALUES ('special');

CREATE TABLE feedback (
  id INT(5) NOT NULL AUTO_INCREMENT,
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message LONGTEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE orders (
  id INT(5) NOT NULL AUTO_INCREMENT,
  f_name TEXT NOT NULL,
  l_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address LONGTEXT NOT NULL,
  items_info LONGTEXT NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE products (
  id INT(5) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL,
  size_list TEXT NOT NULL,
  gender TEXT NOT NULL,
  collection_id INT(5) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY name (name),
  KEY collection_id (collection_id),
  CONSTRAINT products_ibfk_1 FOREIGN KEY (collection_id) REFERENCES collections (id) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE collections AUTO_INCREMENT=12;
ALTER TABLE feedback AUTO_INCREMENT=14;
ALTER TABLE orders AUTO_INCREMENT=47;
ALTER TABLE products AUTO_INCREMENT=13;

COMMIT;