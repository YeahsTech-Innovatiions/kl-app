const express = require("express");
const router = express.Router();
const session = require('express-session');
// Configure express-session middleware
router.use(
  session({
    secret: 'kl', // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if your application is served over HTTPS
  })
);
router.use((req, res, next) => {
  const sessionData = req.session;
  console.log(sessionData, 'session')

  if (req.method === 'GET') {
    // Your code to handle GET requests goes here
    console.log(`Received a GET request for ${req.url}`);
    next();
    // res.send('Hello, this is a response for a GET request.');
  } else {
    // If it's not a GET request, continue to the next middleware
    next();
  }
});
  
let authUser = {
  "Name": "Temitope",
  "Pin": 1234,
  "Role": "Staff"
}
let functions = require('./functions')

router.get("/", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    
    function callback(data){ 
      // res.json(data)
      data.category = functions.getCategories
      data.authUser = authUser
      res.render("dashboard", { data: data });
    }
    functions.admin.getDashboardData(callback)

  } catch (error) {
    res.json(error.message)
  }
});


router.get("/staffs", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    
  let query =  functions.get('Staffs', filters)

  function callback (data){ 
    console.log(data, 'sql')
    data.staffs = data;
    res.render("staffs", { data: data });
  }
  functions.run(query, callback)

  } catch (error) {
    res.json(error.message)
  }
});


router.get("/addStaff", async (req, res, next) => {
  try {
      let data = {};
      let params = req.query
      if(params.id){
         let query =  functions.get('Staffs', {id: params.id})
         function callback (resp){ 
          data.staff = resp[0];
          data.params = params.id;
          res.render("addStaff", { data: data });
        }
        functions.run(query, callback)
      }else{
        res.render("addStaff", { data: data });
      }
  
    } catch (error) {
      res.json(error.message)
    }
});

router.get("/products", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    
  let query =  functions.get('Products', filters)

  function callback (data){ 
    console.log(data, 'sql')
    data.products = data;
    data.category = functions.getCategories
    res.render("products", { data: data });
  }
  functions.run(query, callback)

  } catch (error) {
    res.json(error.message)
  }
});

router.get("/addProduct", async (req, res, next) => {
  try {
    let data = {};
    let params = req.query
    if(params.id){
       let query =  functions.get('Products', {id: params.id})
       function callback (resp){ 
        data.product = resp[0];
        data.params = params.id;
        res.render("addProduct", { data: data });
      }
      functions.run(query, callback)
    }else{
      res.render("addProduct", { data: data });
    }

  } catch (error) {
    res.json(error.message)
  }
});

router.get("/pos", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    
  let query =  functions.get('Products', filters)
  query += `ORDER BY Name ASC;`
  console.log(query)

  function callback (data){ 
    // console.log(data, 'sql')
    data.products = data;

    data.category = functions.getCategories
    res.render("pos", { data: data });
  }
  functions.run(query, callback)

  } catch (error) {
    res.json(error.message)
  }
});


router.get("/sales", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    // filters.Server = authUser.Name

    let query =  functions.get('Sales', filters)
      

    query += `ORDER BY id DESC;`
      function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
  
  if(isObjectEmpty(filters)){
      function callback(data){ 
        // res.json(data)
        data.category = functions.getCategories
        data.authUser = authUser
        res.render("all_sales", { data: data });
      }
      functions.getAllSalesData(callback)
    }else{
        function callback (data){ 
          console.log(data, 'sql')
          data.sales = data;
          data.category = functions.getCategories

          res.render("sales", { data: data });
        }
        functions.run(query, callback)
    }

  } catch (error) {
    res.json(error.message)
  }
});

router.post("/sales", async (req, res, next) => {
  try {
    let cart = req.body.payload;
    console.log(cart, "Received cart");
    
    let data = {};
    let filters = req.query;
    functions.salesStock(cart)
    
    let query =  functions.insert('Sales', cart, {})

    res.json(cart);
    
    // functions.run(query, callback)

  } catch (error) {
    res.json(error.message)
  }
});

router.post("/sales/clear", async (req, res, next) => {
  let table = 'sales'
  let filter = req.body
  let data = {"Status": "CLEARED"}
  // data.id = 
  console.log(data)
  let query =  functions.update(table, data, filter)

  function callback (data){ res.json(data)}
  functions.run(query, callback)
});


router.get("/sale", async (req, res, next) => {
  try {
    let data = {};
    let filters = req.query;
    
  let query =  functions.get('Sales', filters)

  function callback (data){ 
    // console.log(data, 'sql')
    data.sales = data;
    data.category = functions.getCategories
    res.render("sale", { data: data });
  }
  functions.run(query, callback)
  } catch (error) {
    res.json(error.message)
  }
});


router.get("/login", async (req, res, next) => {
  res.render("login");
});

router.post("/login", async (req, res, next) => {
  let user = req.body
  if(user.pin !== '1234'){
    res.render("login");
  }else{
   
  req.session.authUser = authUser
   res.redirect('/app')
  }
});

router.get("/logout", async (req, res, next) => {

req.session.destroy((err) => {
  if (err) {
    console.error('Error destroying session:', err);
  } else {
    console.log('Session destroyed');
    res.redirect('/login');
  }
});
});




module.exports = router;
