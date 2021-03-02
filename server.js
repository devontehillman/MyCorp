const express = require('express');
const mysql = require('mysql');
const config = require('./config/local')
const router = express.Router()
const cTable = require('console.table');
const inquirer = require('inquirer')


// Add departments, roles, employees View departments, roles, employees Update employee roles
inquirer.prompt([
    {
        type: 'list',
        name:'userChoice',
        choices:['View departments','View roles','View employees','Add departments','Add roles','Add employees', 'Update employees role']
    }
]).then((data)=>{
    
    switch(data.userChoice){
        case 'View departments':
            connection.connect((err) => {
                if (err) throw err;
                console.log(`connected as id ${connection.threadId}`);
                readTable(`department`)
            });
        break;

        case'View roles':
            connection.connect((err) => {
                if (err) throw err;
                console.log(`connected as id ${connection.threadId}`);
                readTable(`roles`)
            });
        break;

        case'View employees':
            connection.connect((err) => {
                if (err) throw err;
                console.log(`connected as id ${connection.threadId}`);
                readTable(`employees`)
            });
        break;

        case'Add departments':
        //prompt name
        departmentPrompt();
        
        break;

        case'Add roles':
        //title, salary, department id 
        rolePrompt();
        
        break;

        case'Add employees':
        // add first, last, department?
        employeePrompt();
        
        break;

        case'Update employees role':
        
        break;
    }
})



//Department
function departmentPrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name:'depName',
            message:'Department name'
        }
    ]).then((data)=>{
        createEmployee(`department`,{name: data.depName});
        //this info will connect to a connection query to update the db
    }); 
};

//Role
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
        createEmployee(`roles`,{title: data.jobTitle, salary: data.salary, department_id: data.depID});
        //readTable(`roles`)
    }); 
};

//Employee
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
        }
    ]).then((data)=>{
        createEmployee(`employees`, {firstname: data.firstName, lastname: data.lastName});
        //readTable(`employees`)
    }); 
}  

// view any thing 
// access table from db and display 
const readTable = (tableName) => {
    console.log(`Viewing the ${tableName} table...\n`);
    connection.query(`SELECT * FROM ` + tableName, (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  };
// add departments,role, employees
// access database and insert into it

//update employees is this a modifier?
const createEmployee = (selection,queryObj) => {
    console.log('Inserting a new employee...\n');
    const query = connection.query(
      'INSERT INTO '+ selection +' SET ?',queryObj,
      (err, res) => {
        if (err) throw err;
        console.table(`${res.affectedRows} product inserted!\n`);
        // Call updateProduct AFTER the INSERT completes
        readTable(selection);
      }
    );
}

// delete a Employee
//add an employee

// create mysql connection
const connection = mysql.createConnection(config.db);

// create routes