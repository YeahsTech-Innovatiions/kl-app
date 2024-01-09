var mysql = require('mysql');

// connecting Database
const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "shaey",
  // user: "kladmin",
  password: "",
  database: "kl",
});


let functions = {
    "init": (table, data)=>{
      try {
        const data = connection.promise().query(`SELECT *  from ${table} ${query};`);
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
    },
    "get": (table, filters)=>{
      // Sample dynamic SELECT query with filtering
      const tableName = table;
      const columnsToSelect = ['id', 'Name', 'Price'];

      const whereClause = Object.entries(filters).map(([key, value]) =>`${key} = '${value}'`).join(' AND ');
      const query = `SELECT * FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''}`;
        console.log(filters)
      // Perform the SELECT query
      return query
    },
    "insert": (table, data, filters)=>{
      const tableName = table;
      const columns = Object.keys(data).join(', ');
      const values = Object.values(data).map(value => (typeof value === 'string' ? `'${value}'` : value)).join(', ');

      // Construct the WHERE clause based on filters
      const whereClause = Object.entries(filters)
        .map(([key, value]) => `${key} = ${value}`)
        .join(' AND ');

      const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) ${whereClause ? `WHERE ${whereClause}` : ''}`;
      console.log(query)
      connection.query(query, (err, result) => {
        if (err) {
          console.error('Error inserting into MySQL:', err);
        } else {
          console.log('Inserted into MySQL:', result);
        }

      });
    },
    "update": (table, data, filters)=>{
      
      const tableName = table; // Replace 'products' with your actual table name
      const updateSetClause = Object.entries(data)
        .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
        .join(', ');
      
      const whereClause = Object.entries(filters)
        .map(([key, value]) => `${key} = ${value}`)
        .join(' AND ');
      const query = `UPDATE ${tableName} SET ${updateSetClause} ${whereClause ? `WHERE ${whereClause}` : ''}`;
      return(query);
    },
    "delete": (table, filters)=>{
     filters = {
        Category: 'Premium',
        Stock: '> 50'
      };
      
      const tableName = table; // Replace 'products' with your actual table name
      
      const whereClause = Object.entries(filters)
        .map(([key, value]) => `${key} ${value}`)
        .join(' AND ');
      
      const query = `DELETE FROM ${tableName} ${whereClause ? `WHERE ${whereClause}` : ''}`;
      // console.log(query);
    },
    
    "run": async(query, callback)=>{
       connection.query(query, (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          throw err
        } else {
          callback(results)
        }
      })
    },
    
    "queries":{
      "products":{
      "get":{table: "Products", data: {}, filters: {}} ,
      "getProductsByCategory":{table: "Products", data: {}, filters: {"Category": ""}} ,
      "getProductsByTag":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getProductsByStock":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getProductsByPrice":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      },
      "staffs":{
      "get":{table: "Staffs", filters: {}} ,
      "getByName":{table: "Staffs", filters: {"Name": ""}} ,
      },
      "sales":{
      "get":{table: "Products", data: {}, filters: {"Category": "Category"}} ,
      "getByServer":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getByTable":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getByCategory":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getUnClearedSales":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getClearedSales":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "clearStaffSale":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      },
      "orders":{
      "get":{table: "Products", data: {}, filters: {"Category": "Category"}} ,
      "getByServer":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "getByCategory":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      },
      "crud":{
      "get":{table: "Products", data: {}, filters: {"Category": "Category"}} ,
      "insert":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "update":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      "delete":{table: "Products", data: {}, filters: {"Tag": ""}} ,
      },
    },
    "admin": {
    "getDashboardData": (callback)=>{
      let pquery =  functions.get('Products', {})
      let squery =  functions.get('Staffs', {})
      let oquery =  functions.get('Sales', {})
      let data = {}
      connection.query(pquery, (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          throw err
        } else {
          data.products = results
          connection.query(squery, (err, results) => {
            if (err) {
              console.error('Error querying MySQL:', err);
              throw err
            } else {
              data.staffs = results
              connection.query(oquery, (err, results) => {
                if (err) {
                  console.error('Error querying MySQL:', err);
                  throw err
                } else {
                  data.sales = results
                  callback(data)
                }
              })
            }
          })
        }
      })
    },
    "NotificationSystem":()=>{},
    "LogSystem":{
      "transaction": async (txn)=>{
        console.log(txn)
         functions.insert('Transactions', txn).then(data=>{
          console.log(data)
         })
         

        //  .then(depositData=>{
        //   res.json(depositData)
        // })
      },
    }
    },
    "getCategories":[{"Name": "Bar"}, { "Name": "Kitchen"}, {  "Name": "Grill"}, {  "Name": "Premium"}],
    "salesStock":(sale)=>{
      console.log(sale, 'Sale!')
      const query = `UPDATE Products SET Stock = Stock - ${sale.Qty} WHERE id = ${sale.Pid};`;
      console.log(query)
      connection.query(query, (err, result) => {
        if (err) {
          console.error('Error inserting into MySQL:', err);
        } else {
          console.log('Inserted into MySQL:', result);
        }

      });
    },
    "getAllSalesData": (callback)=>{
      let kquery =  functions.get('Sales', {"Cid": "Kitchen"})
      let bquery =  functions.get('Sales', {"Cid": "Bar"})
      let gquery =  functions.get('Sales', {"Cid": "Grill"})
      let pquery =  functions.get('Sales', {"Cid": "Premium"})
      let data = {}
      connection.query(kquery, (err, results) => {
        if (err) {
          console.error('Error querying MySQL:', err);
          throw err
        } else {
          data.kitchen_sales = results
          connection.query(bquery, (err, results) => {
            if (err) {
              console.error('Error querying MySQL:', err);
              throw err
            } else {
              data.bar_sales = results
              connection.query(gquery, (err, results) => {
                if (err) {
                  console.error('Error querying MySQL:', err);
                  throw err
                } else {
                  data.grill_sales = results
                  connection.query(pquery, (err, results) => {
                    if (err) {
                      console.error('Error querying MySQL:', err);
                      throw err
                    } else {
                      data.premium_sales = results
                      callback(data)
                    }
                  })
                }
              })
            }
          })
        }
      })
    },
    "setSession":()=>{

    }
  }
module.exports = functions;

