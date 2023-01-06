USE employees_db;

INSERT INTO department(name) VALUES 
("Engineering"), 
("Finance"), 
("Legal"), 
("Sales");

INSERT INTO role (title, salary, department_id) VALUES
("Lead Engineer", 180000, 1),
("Junior Engineer", 80000, 1),
("Accountant", 120000, 2),
("Legal Manager", 200000, 3),
("Sales Manager", 105000, 4),
("Copywrite", 75000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
(Gevorv, Hatet, 1, NULL)
(Flank, Leer, 2, 1),
(Nark, Narz, 2, 1),
(Danathon, Shoe, 3, 5),
(Johnathon, Vos, 4, NULL)
(Hosh, Orlra, 5, NULL),
(Bobo, Monke, 6, 6),
(Sureby, Lof, 6, 6),
(Ander, Tan, 2, 1);
