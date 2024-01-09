const express = require("express");
// const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const router = express.Router();
var mysql = require('mysql2');

// import mysql from "mysql2";
// import functions from './functions.js'
let functions = require('./functions')

// connecting Database
const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "shaey",
  password: "",
  database: "kl",
});

// post request

router.get("/init", async (req, res) => {
    const table = req.params.table;
    const filters = req.query;
    console.log(table)
    console.log(filters)
    let query = processFilters(filters)
  try {
    const data = await connection.promise().query(`SELECT *  from ${table} ${query};`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});



router.get("/:endpoint", async (req, res) => {
  let table = req.params.endpoint
  let filter = req.query
  console.log(filter)
  
  let query =  functions.get(table, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)

});

router.post("/product/add", async (req, res) => {
  let table = 'products'
  let filter = {}
  let data = req.body
  // data.id = Date.now()
  console.log(data)
  let query =  functions.insert(table, data, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});

router.post("/product/edit", async (req, res) => {
  let table = 'products'
  let filter = req.query
  let data = req.body
  // data.id = 
  let query =  functions.update(table, data, filter)
  console.log(query)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});

router.post("/sales/add", async (req, res) => {
  let table = 'sales'
  let filter = req.query
  let data = req.body
  // data.id = Math.random()
  console.log(data)
  let query =  functions.insert(table, data, filter)

  function callback (respdata){ 
    functions.salesStock(data)
    res.json(respdata)
  }
  functions.run(query, callback)
});

router.post("/sales/edit", async (req, res) => {
  let table = 'sales'
  let filter = req.query
  let data = req.body
  // data.id = 
  console.log(data)
  let query =  functions.update(table, data, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});


router.post("/staffs/add", async (req, res) => {
  let table = 'staffs'
  let filter = req.query
  let data = req.body
  // data.id = Math.random()
  console.log(data)
  let query =  functions.insert(table, data, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});

router.post("/staffs/edit", async (req, res) => {
  let table = 'staffs'
  let filter = req.query
  let data = req.body
  // data.id = 
  console.log(data)
  let query =  functions.update(table, data, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});



// let request = req.


module.exports = router;
