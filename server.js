//Requires
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

//Setting up mysql connection
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '', //IMPORTANT NOTE FOR SELF! Include mysql password here when testing application but REMOVE IT before pushing to github!
        database: 'employees_db', 
        port: 3001
    }
);

//Connecting mysql server + database
db.connect(function (err) {
    if (err) throw err;
    //Function to begin the command line interaction
    startPrompts();
});

//Prompts and corrisponding function calls
const startPrompts =() => {
    inquirer.prompt(
    {
    type: "list",
    name: "intro",
    message: "Hello! Welcome to the Employee Tracker Program! What would you like to start with?",
    choices: [
        "View Employee List", 
        "Add an Employee",
        "Remove an Employee",
        "View Departments", 
        "Add a Department",
        "Remove a Department",
        "View Role List", 
        "Add a Role",
        "Remove a Role",
        "Update an Employee's Role",
        "View Employees by Department",
        "Close"
    ]
    
    })
    .then((response) => {
        const {choices} = response;

        if (choices === "View Employee List") {
            viewEmployeeList();
        }

        if (choices === "Add an Employee") {
            addEmployee();
        }

        if (choices === "Remove an Employee") {
            removeEmployee();
        }

        if (choices === "View Departments") {
            viewDepartmentList();
        }

        if (choices === "Add a Department") {
            addDepartment();
        }

        if (choices === "Remove a Department") {
            removeDepartment();
        }

        if (choices === "View Role List") {
            viewRoleList();
        }

        if (choices === "Add a Role") {
            addRole();
        }

        if (choices === "Remove a Role") {
            removeRole();
        }

        if (choices === "Update an Employee's Role") {
            updateEmployeeRole();
        }

        if (choices === "View Employees by Department") {
            filterEmployeeByDepartment();
        }

        if (choices === "Close") {
            console.log("Thank you for using this Employee Tracker App! Your connection will now end for this session.")
            db.end();
        }
    });
};