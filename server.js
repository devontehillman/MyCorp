const express = require('express');
const mysql = require('mysql');
const config = require('../config/local')
const router = express.Router()
const cTable = require('console.table');



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
        
        break;

        case'View roles':
        
        break;

        case'View employees':
        
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
    ]).then((data)=>{}); 
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
    ]).then((data)=>{}); 
}  

// view any thing 
// access table from db and display 

// add departments,role, employees
// access database and insert into it

//update employees is this a modifier?
// delete a employee
//add an employee