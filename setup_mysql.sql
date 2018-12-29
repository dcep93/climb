
DROP USER 'root'@'localhost';
CREATE USER 'root'@'%' IDENTIFIED BY @pw;
GRANT ALL PRIVILEGES TO *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE DATABASE climb;
USE climb;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(32) NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    is_admin BOOL NOT NULL DEFAULT FALSE,
    is_verified BOOL NOT NULL DEFAULT FALSE,
    name TEXT,
    image TEXT,
    PRIMARY KEY (id),
    UNIQUE KEY google_id (google_id)
);

CREATE TABLE gyms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    path VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY path (path)
);

CREATE TABLE walls (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    gym_id INT UNSIGNED NOT NULL,
    name VARCHAR(32) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    location VARCHAR(32) NOT NULL,
    date DATE NOT NULL,
    setter VARCHAR(32) NOT NULL,
    active BOOL NOT NULL,
    color VARCHAR(32) NOT NULL,
    PRIMARY KEY (gym_id, id),
    UNIQUE KEY id (id)
);

CREATE TABLE climbed_walls (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    gym_id INT UNSIGNED NOT NULL,
    wall_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    active BOOL NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    UNIQUE KEY gym_id_wall_id_user_id(gym_id, wall_id, user_id),
    KEY user_id(user_id)
);
