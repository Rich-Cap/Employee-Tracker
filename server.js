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

function startApp(){
	
}
