//Requires
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");

//Setting up mysql connection
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: '*', // REMEMBER TO PUT THIS BACK TO NEW PW AFTER CHANGE WHEN TESTING
        database: 'employees_db'
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
    name: "intro",
    type: "list",
    message: "Hello! Welcome to the Employee Tracker Program! What would you like to start with?",
    choices: [
        "View Employee List", 
        "Add an Employee",
        "View Departments", 
        "Add a Department",
        "View Role List", 
        "Add a Role",
        "Update an Employee's Role",
        "Close"
    ],
    
    })
    .then((response) => {
        const {intro} = response;

        if (intro === "View Employee List") {
            viewEmployeeList();
        }

        if (intro === "Add an Employee") {
            addEmployee();
        }

        if (intro === "View Departments") {
            viewDepartmentList();
        }

        if (intro === "Add a Department") {
            addDepartment();
        }

        if (intro === "View Role List") {
            viewRoleList();
        }

        if (intro === "Add a Role") {
            addRole();
        }

        if (intro === "Update an Employee's Role") {
            updateEmployeeRole();
        }

        if (intro === "Close") {
            console.log("Thank you for using this Employee Tracker App! Your connection will now end for this session.")
            db.end();
        }
    });
};

// Functions for choices 

const viewEmployeeList = () => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    startPrompts();
}

const addEmployee = () => {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        });
        inquirer.prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the new employee!'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the new employee!'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Enter the new employees role!',
                choices: roles
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Enter this employee`s manager id!',
                choices: [1, 4 , 5 , 6]
            }
        ])
        .then ((data) => {
            console.log(data.role);
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    role_id: data.role,
                    manager_id: data.managerId,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Employee Added!');
                    viewEmployeeList();
                }
            )
        })
    })
};

const viewDepartmentList = () => {
    const query = 'SELECT * FROM department';
    db.query(query, (err,res) => {
        if (err) throw err;
        console.table(res);
    })
    startPrompts();
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Enter the name of the new department!'
        }
    ])
    .then((data) => {
        db.query('INSERT INTO DEPARTMENT SET ?',
        {
            name: data.newDepartment
        },
        function (err) {
            if (err) throw err;
        }
    );
    console.log('New department added!')
    viewDepartmentList();
    });
};

const viewRoleList = () => {
    const query = 'SELECT * FROM role';
    db.query(query, (err, res) => {
        if (err) throw err; 
        console.table(res);
    })
    startPrompts();
}

const addRole = () => {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the name of the new role!'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary associated with this role'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Enter the department that this role is under!',
                choices: departments,
            },
        ])
        .then((data) => {
            db.query('INSERT INTO role SET ?',
            {
                title: data.newRole,
                salary: data.salary,
                department_id: data.departmentId
            },
            function (err) {
                if (err) throw err;
            }
        );
        console.log("New role added!")
        viewRoleList();
        });
    });
};

const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        db.query('SELECT * FROM role', (err, roles) => {
            if (err) console.log(err);
            roles = roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id,
                }
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'currentEmployee',
                    message: 'Choose which employee info you would like to update!',
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'chooseNewRole',
                    message: 'Choose the new role for this employee!',
                    choices: roles
                },
            ])
            .then((data) => {
                db.query('UPDATE employee SET ? WHERE ?',
                [
                    {
                        role_id: data.chooseNewRole
                    },
                    {
                        id: data.currentEmployee
                    },
                ],
                function (err) {
                    if (err) throw err;
                }
                );
                console.log ('Employee role updated!');
                viewRoleList();
                viewEmployeeList();
            });
        });
    });
};