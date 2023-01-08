DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id), 
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NULL,
    salary DECIMAL NOT NULL, 
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES role(id),
    PRIMARY KEY (id)
);

