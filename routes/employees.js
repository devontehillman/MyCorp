const express = require('express');
const mysql = require('mysql');
const config = require('../config/local')
const router = express.Router()
const cTable = require('console.table');

const app = express()
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Root get route
const readProducts = () => {
    console.log('Selecting all employees...\n');
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    });
  };

  const createProduct = () => {
    console.log('Inserting a new product...\n');
    const query = connection.query(
      'INSERT INTO employees SET ?',
      {
        firstname: 'Rocky',
        lastname: 'Road',
      },
      (err, res) => {
        if (err) throw err;
        console.table(`${res.affectedRows} product inserted!\n`);
        // Call updateProduct AFTER the INSERT completes
        readProducts();
      }
    );
}

const deleteProduct = () => {
    console.log('Deleting all strawberry icecream...\n');
    connection.query(
      'DELETE FROM employees WHERE ?',
      {
        firstname: 'Rocky',
      },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} products deleted!\n`);
        // Call readProducts AFTER the DELETE completes
        readProducts();
      }
    );
  };
  
// create mysql connection
const connection = mysql.createConnection(config.db);

// create routes
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  deleteProduct()
});


// app.listen(PORT, () =>
//   console.log(`Server listening on: http://localhost:${PORT}`)
// );