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
