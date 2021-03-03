const config = require('./config/local')
const cTable = require('console.table');
const inquirer = require('inquirer')
const mysql = require('mysql');
const chalk = require('chalk');

// Add departments, roles, employees View departments, roles, employees Update employee roles
function mainPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            name:'userChoice',
            message: 'Choose an action:',
            choices:['View departments','View roles','View employees','Add departments','Add roles','Add employees','Update employees role','Exit']
        }
    ]).then((data)=>{
        switch(data.userChoice){
            case 'View departments':
                readTable(`department`)
            break;

            case'View roles':
                readTable(`roles`)
            break;

            case'View employees':
                readTableEmployee()
            break;

            case'Add departments':
                departmentPrompt();
            break;

            case'Add roles':
                rolePrompt();
            break;

            case'Add employees':
                employeePrompt();
            break;

            case'Update employees role':
                updateTablePrompts()
            break;

            case'Exit':
            connection.end()
            console.log('Untill Next time!')
            break;

        }
    })
}

//Department Prompts
function departmentPrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name:'depName',
            message:'Department name'
        }
    ]).then((data)=>{
        //Function that takes user input and updates the DB
        createTableEl(`department`,{name: data.depName});
    }); 
};

//Role Prompts
function rolePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name:'jobTitle',
            message:'Job title'
        },
        {
            type: 'input',
            name:'salary',
            message:'Salary'
        },
        {
            type: 'input',
            name:'depID',
            message:'Department ID'
        }
    ]).then((data)=>{
        //Function that takes user input and updates the DB
        createTableEl(`roles`,{title: data.jobTitle, salary: data.salary, department_id: data.depID});
    }); 
};

//Employee Prompts 
function employeePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name:'firstName',
            message:'First name'
        },
        {
            type: 'input',
            name:'lastName',
            message:'Last name'
        },
        {
            type: 'input',
            name:'roleID',
            message:'Role ID'
        },
        {
            type: 'input',
            name:'managerID',
            message:'Managers ID'
        }
    ]).then((data)=>{
        //Function that takes user input and updates the DB
        createTableEl(`employees`, {firstname: data.firstName, lastname: data.lastName, role_id: data.roleID, manager_id: data.managerID});
    }); 
}  

// view any thing 
// view employee has its own function because of its special query found at the bottom of this page
const readTableEmployee = (tableName) => {
    console.log(`\nViewing the Employee table...\n`)
    connection.query(employeeQuery, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      restartPrompt()
    });
  }
// access table from db and display 
const readTable = (tableName) => {
    console.log(`\nViewing the ${tableName} table...\n`);
    connection.query(`SELECT * FROM ` + tableName, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      restartPrompt()
      
    });
  };
// add departments,role, employees
const createTableEl = (selection,queryObj) => {
    console.log('Inserting a new employee...\n');
    const query = connection.query(
      'INSERT INTO '+ selection +' SET ?',queryObj,
      (err, res) => {
        if (err) throw err;
        console.table(`Added new ` + selection);
        restartPrompt()
      }
    );
}

//Table Prompts
function updateTablePrompts(){
    inquirer.prompt([
        {
            type: 'input',
            name:'employeeID',
            message:'Employee\'s ID that you want to update:'
        },
        {
            type: 'input',
            name:'newRoleId',
            message:'Employee\'s New Role ID:'
        }
    ]).then((data)=>{
        //Function that takes user input and updates the DB
        updateTable(data.employeeID,data.newRoleId)
    }); 
};

//update employees is this a modifier?
const updateTable = (employee_id, newRoleId) => {
    console.log('Updating employee id...\n');
    const query = connection.query(
      'UPDATE employees SET ? WHERE ?',[{role_id:newRoleId},{id:employee_id},], (err, res) => {
        if (err) throw err;
        console.log(`Employee role updated!\n`);
        restartPrompt()
      }
    );
    //add console log "employee with id updated role to..."
  };

// restart the prompt function
function restartPrompt(){
    inquirer.prompt([
        {
            type: 'confirm',
            name:'userConfim',
            message: 'would you like to do something else?',
        }
    ]).then((data)=>{
        if(data.userConfim){
            mainPrompt()
        }else{
            connection.end()
            console.log('Untill Next time!')
        }
    })
    };
// delete an Employee
//add an employee

// create mysql connection
const connection = mysql.createConnection(config.db);

// Init program
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    console.log(chalk.blue(chalkText));
    mainPrompt()
});


// query string for viewing employees with additional information
const employeeQuery= 
`SELECT employees.id, employees.firstname, employees.lastname, roles.title, department.name dePartment, roles.salary
FROM employees
INNER JOIN department ON employees.role_id=department.id
INNER JOIN roles ON employees.role_id = roles.department_id`

const chalkText = 
`------------------------------------------------------------------------------------------------------ 
 __       ___    ____      ____     _________         ____________       _________         ___________
/  \\    /   |  /   /     /   /    /           \\      /           / \\    |         /\\      /          /\\
$$$ \\  /$$$ |  $$$$      $$$$ |  /$$$$$$$$$$$  \\    /$$$$$$$$$$$$   \\   $$$$$$$$$$  \\    $$$$$$$$$$$$  \\
$$$$ \\/$$$$ |   $$$$    $$$$ |  $$$$$$$$$$$$$$$|   /$$$$$$$$$$$$$$$  |  $$$$$$$$$$$  \\   $$$      $$$$  | 
$$$$$$$$$$  |    $$$$  $$$$ |   $$$   ______$$$|   $$  ________   $$ |  $$$       $$  |  $$$       $$$$ |
$$$ $$ $$$  |       $$$$  |     $$$  |             $$ |        |  $$ |  $$$       $$  |  $$$       $$$$ |
$$$    $$$  |       $$$$ |      $$$  |       ____  $$ |        |  $$ |  $$$$$$$$$$$  /   $$$$$$$$$$$$  /
$$$    $$$  |       $$$$ |      $$$  |______/   /| $$ |________|  $$ |  $$$   $$$$  /    $$$  ________/    
$$$    $$$  |       $$$$ |      $$$          $$$ | $$             $$ |  $$$    $$$$ \\    $$$ |           
$$$    $$$  |       $$$$ |       $$$$$$$$$$$$$$ /   $$$$$$$$$$$$$$$ /   $$$     $$$$ \\   $$$ |            
$$$    $$$_/        $$$$_|        $$$$$$$$$$$$_/     $$$$$$$$$$$$$_/    $$$      $$$$_\\  $$$_|           

-------------------------------------------------------------------------------------------------------
`;