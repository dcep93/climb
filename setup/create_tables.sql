CREATE DATABASE climb;
USE climb;

CREATE TABLE users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    google_id VARCHAR(32) NOT NULL,
    is_admin BOOL NOT NULL DEFAULT FALSE,
    is_verified BOOL NOT NULL DEFAULT FALSE,
    email VARCHAR(128),
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

CREATE TABLE problems (
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
    PRIMARY KEY (id),
    KEY gym_path (gym_path)
);

CREATE TABLE climbed_problems (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    gym_path VARCHAR(32) NOT NULL,
    problem_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    active BOOL NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY gym_path_problem_id_user_id (gym_path, problem_id, user_id)
);

CREATE TABLE problem_media (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    problem_id INT UNSIGNED NOT NULL,
    gcs_path VARCHAR(128) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    file_size INT UNSIGNED NOT NULL,
    mime VARCHAR(32) NOT NULL,
    data TEXT,
    width INT UNSIGNED,
    height INT UNSIGNED,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
