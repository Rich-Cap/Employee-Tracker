INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), 
	("Salesperson", 80000, 1), 
	("Lead Engineer", 150000, 2),
	("Software Engineer", 120000, 2),
	("Accountant", 125000, 3),
	("Legal Team Lead", 250000, 4),
	("Lawyer", 190000, 4),
	("Lead Engineer", 150000, 2),
	("Recruiter", 50000, 5),
	("HR Manager", 120000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 15, 12), 
	("Mike", "Chan", 2, 15),
	("Ashley", "Rodriguez", 12, null),
	("Kevin", "Tupik", 5, 12),
	("Nalia", "Brown", 9, null),
	("Sarah", "Lourd", 8, null), 
	("Tom", "Allen", 6, 8),
	("Christian", "Eckenrode", 11, 2),
	("Tom", "Jones", 22, 18),
	("Shannon", "Caroll", 18, null);