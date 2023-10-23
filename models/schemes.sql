CREATE DATABASE users_db;
USE users_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    phone INT NOT NULL,
    Gender VARCHAR(5) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO users(Fname,Lname,email,pass,age,phone,Gender)
VALUES
{"mohame","Abdullgalil","gello@gello.com","gello5555","20","01062053584","Male"}