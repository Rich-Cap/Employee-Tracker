// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// Connect to MySQL database
const connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "rootpass",
	database: "employees_DB"
});

// Connect to Server
connection.connect(function (err) {
	if (err) throw err;
	startApp();
});

// Initial prompt and switch cases depending on selection
function startApp(){
	inquirer
    .prompt({
        name: "selections",
        type: "list",
        message: "What would you like to do?",
        choices: [
                "View All Employees",
                "View All Department",
                "View All Roles",
                "Add An Employee",
                "Add a Department",
				"Add a Role",
				"Update an Employee Role",
                "EXIT"
        ]
    }).then(function (answer) {
        switch (answer.selections) {
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Department":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Add a Department":
                addDepartment();
                break;
            case "Add a Role":
                addRole();
				break;
			case "Update an Employee Role":
				updateRole();
				break;
            case "EXIT": 
                connection.end();
                break;
        }
    })
}

function viewEmployees() {
	// console.log("You are viewing employees");
	var query = "SELECT id, first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} employees`);
    console.table('All Employees:', res); 
    startApp();
    })
}

function viewDepartments() {
	// console.log("You are viewing departments");
	var query = "SELECT name FROM department";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} departments`);
    console.table('All Departments:', res); 
    startApp();
    })
}

function viewRoles() {
	// console.log("You are viewing roles");
	var query = "SELECT title FROM role";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} roles`);
    console.table('All Roles:', res); 
    startApp();
    })
}

function addEmployee() {
	console.log("You are adding employees");
}

function addDepartment() {
	console.log("You are adding a department");
}

function addRole() {
	console.log("You are adding a role");
}

function updateRole() {
	console.log("You are updating a role");
}