//Requires
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

//Connecting mysql
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '', //IMPORTANT NOTE FOR SELF! Include mysql password here when testing application but REMOVE IT before pushing to github!
        database: 'employees_db', 
        port: 3001
    }
);

