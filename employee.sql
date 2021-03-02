CREATE DATABASE IF NOT EXISTS employeesdb;

USE employeesdb 

CREATE TABLE IF NOT EXISTS department(
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS roles(
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30),
salary DECIMAL, 
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS employees(
id INT AUTO_INCREMENT NOT NULL,
firstname VARCHAR(25),
lastname VARCHAR(25),
PRIMARY KEY (id)
);

INSERT INTO employees (firstname, lastname)
VALUES ('Joe','Smo');

INSERT INTO employees (firstname, lastname)
VALUES ('Jhon','Doe');

INSERT INTO employees (firstname, lastname)
VALUES ('Lucy','May');

INSERT INTO employees (firstname, lastname)
VALUES ('Molly','Totty');