CREATE DATABASE climb;
USE climb;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(32) NOT NULL,
    is_admin BOOL NOT NULL DEFAULT FALSE,
    is_verified BOOL NOT NULL DEFAULT FALSE,
    name TEXT,
    image TEXT,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY google_id (google_id)
);

CREATE TABLE gyms (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    path VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY path (path)
);

CREATE TABLE walls (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    gym_path VARCHAR(32) NOT NULL,
    name VARCHAR(32) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    location VARCHAR(32) NOT NULL,
    date DATE NOT NULL,
    setter VARCHAR(32) NOT NULL,
    active BOOL NOT NULL,
    color VARCHAR(32) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gym_path, id)
);

CREATE TABLE climbed_walls (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    gym_path VARCHAR(32) NOT NULL,
    wall_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    active BOOL NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY gym_path_wall_id_user_id (gym_path, wall_id, user_id)
);