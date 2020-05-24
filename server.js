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
connection.connect(err => {
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
	var query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} employees`);
    console.table("All Employees:", res); 
    startApp();
    })
}

function viewDepartments() {
	// console.log("You are viewing departments");
    connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} departments`);
    console.table("All Departments:", res); 
    startApp();
    })
}

function viewRoles() {
	// console.log("You are viewing roles");
    connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log(`You are viewing ${res.length} roles`);
    console.table("All Roles:", res); 
    startApp();
    })
}

function addEmployee() {
	// console.log("You are adding employees");
	// connection.query("SELECT role.title, employee.first_name, employee.last_name, employee.role_id, manager_id FROM role FULL OUTER JOIN employee ON employee.role_id=role.id ORDER BY role.title", 
	connection.query("SELECT * FROM role", function (err, res) {
		if (err) throw err;
		inquirer
			.prompt([
				{
					name: "first_name",
					type: "input", 
					message: "What is the employee's first name?",
				},
				{
					name: "last_name",
					type: "input", 
					message: "What is the employee's last name?"
				},
				{
					name: "role", 
					type: "list",
					choices: function() {
					var roleArray = [];
					for (var i = 0; i < res.length; i++) {
						roleArray.push(res[i].title);
					}
					return roleArray;
					},
					message: "What is the employee's role?"
				},
				// {
				// 	name: "manager", 
				// 	type: "list",
				// 	choices: function() {
				// 	var managerArray = [];
				// 	for (let i = 0; i < res.length; i++) {
				// 		var managers = res[i].first_name + " " + res[i].last_name;
				// 		managerArray.push(managers);
				// 	}
				// 	return managerArray;
				// 	},
				// 	message: "Who is the employee's manager?"
				// }
				])
			.then(function (answer) {
				var roleID;
				for (var i = 0; i < res.length; i++) {
					if (res[i].title == answer.role) {
						roleID = res[i].id;
						console.log(roleID)
					}                  
				}  
				connection.query(
				"INSERT INTO employee SET ?",
				{
					first_name: answer.first_name,
					last_name: answer.last_name,
					role_id: roleID,
				},
				function (err) {
					if (err) throw err;
					console.log("New employee has been added!");
					startApp();
				}
			)
		})
	})
}

function addDepartment() {
	// console.log("You are adding a department");
	inquirer
		.prompt([
			{
				name: "new_dept", 
				type: "input", 
				message: "What is the name of the new Department?"
			}
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO department SET ?",
				{
					name: answer.new_dept
				}
			);
			var query = "SELECT * FROM department";
			connection.query(query, function(err, res) {
			if(err)throw err;
			console.table("All Departments:", res);
			startApp();
			})
		})
}

function addRole() {
	// console.log("You are adding a role");
	connection.query("SELECT * FROM department", function(err, res) {
		if (err) throw err;
		inquirer 
			.prompt([
				{
					name: "new_role",
					type: "input", 
					message: "What is the title of the new role?"
				},
				{
					name: "salary",
					type: "number",
					message: "What is the salary of this position?"
				},
				{
					name: "deptChoice",
					type: "list",
					choices: function() {
						var deptArry = [];
						for (var i = 0; i < res.length; i++) {
						deptArry.push(res[i].name);
						}
						return deptArry;
					},
				}
			])
			.then(function (answer) {
				var deptID;
				for (var i = 0; i < res.length; i++) {
					if (res[i].name == answer.deptChoice) {
						deptID = res[i].id;
					}
				}
				connection.query(
					"INSERT INTO role SET ?",
					{
						title: answer.new_role,
						salary: answer.salary,
						department_id: deptID
					},
					function (err, res) {
						if(err)throw err;
						console.log("Your new role has been added!");
						startApp();
					}
				)
			})
	})
}

function updateRole() {
	// console.log("You are updating a role");
	var roleQuery = "SELECT * FROM role;";
    var departmentQuery = "SELECT * FROM department;";

    connection.query(roleQuery, function (err, roles) {
		if (err) throw err;
        connection.query(departmentQuery, function (err, departments) {

            if (err) throw err;
            inquirer.prompt([
                {
                    name: "new_role",
                    type: "rawlist",
                    choices: function () {
                        var roleArray = [];
                        for (var i = 0; i < roles.length; i++) {
                            roleArray.push(roles[i].title);
                        }
                        return roleArray;
                    },
                    message: "Choose a role to update"
                },
                {
                    name: "new_salary",
                    type: "input",
                    message: "What is the new salary for this role?"
                },
                {
                    name: "department",
                    type: "rawlist",
                    choices: function () {
                        var deptArry = [];
                        for (var i = 0; i < departments.length; i++) {
                            deptArry.push(departments[i].name);
                        }
                        return deptArry;
                    },
                    message: "Which department this role belongs to?"
                },
            ]).then(function (result) {
                for (var i = 0; i < departments.length; i++) {
                    if (departments[i].name === result.department) {
                        result.department_id = departments[i].id;
                    }
                }
                connection.query("UPDATE role SET title=?,salary= ? WHERE department_id= ?", [
                    { title: result.new_role },
                    { salary: result.new_salary },
                    { department_id: result.department_id }
                ], function (err) {
                    if (err) throw err;
                    console.table("Role Successfuly Updated!");
                    startApp()
                });
            })
        })
    })
}