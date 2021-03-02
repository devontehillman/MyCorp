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
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);

INSERT INTO employees (firstname, lastname, role_id)
VALUES ('Devonte','Hillman',3);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Ana','Estrella', 2, 1);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Robert','Webb', 2, 1);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Jhon','Doe', 1, 2);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Lucy','May', 1, 2);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Molly','Totty', 1, 3);

INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Joe','Smo', 1, 3);

INSERT INTO department (name)
Value('Front Desk');

INSERT INTO department (name)
Value('County-Branch');

INSERT INTO department (name)
Value('Corporate');

INSERT INTO roles (title, salary, department_id)
values('ceo','1000000','3');

INSERT INTO roles (title, salary, department_id)
values('Manager','30000','2');

INSERT INTO roles (title, salary, department_id)
values('Team-Staff','10000','1');
