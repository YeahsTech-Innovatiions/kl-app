const express = require("express");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const session = require('express-session');


passport.use(new LocalStrategy(function verify(username, password, cb) {
    if (password == '') { return cb(err); }
    try {
        let data = {};
        let filters = {'pin':password};

        let query = functions.get('Staffs', filters)

        function callback(data) {
            data = data[0];
            let isAdmin =  false;
            console.log(data, 'sql')
            if(!data){return cb(null, false, { message: 'Incorrect password.' })}
            if(data.Name == 'kladmin'){ isAdmin = true}
            return cb(null, {'id': data.id, 'isAdmin': isAdmin, 'name':data.Name, 'phone':data.Phone});
        }
        functions.run(query, callback)

    } catch (error) {
        res.json(error.message)
    }
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, {'id': user.id, 'isAdmin': user.isAdmin, 'name':user.name, 'phone':user.phone});
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

const checkAuth = (req, res, next) => {
    // console.log(req.path)
    if (req.isAuthenticated()) { console.log('Authenticated::isAdmin?',req.session.passport.user.isAdmin); return next() }
    res.redirect('/login')
}

// router.use((req, res, next) => {
//   const sessionData = req.session;
//   console.log(sessionData, 'session')

//   if (req.method === 'GET') {
//     // Your code to handle GET requests goes here
//     console.log(`Received a GET request for ${req.url}`);
//     next();
//     // res.send('Hello, this is a response for a GET request.');
//   } else {
//     // If it's not a GET request, continue to the next middleware
//     next();
//   }
// });

// let authUser = {
//     "Name": "Temitope",
//     "Pin": 1234,
//     "Role": "Staff"
// }

let functions = require('./functions')

router.get("/", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;

        function callback(data) {
            // res.json(data)
            data.category = functions.getCategories
            data.authUser = req.session.passport.user
            res.render("dashboard", { data: data });
        }
        functions.admin.getDashboardData(callback)

    } catch (error) {
        res.json(error.message)
    }
});


router.get("/staffs", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;

        let query = functions.get('Staffs', filters)

        function callback(data) {
            console.log(data, 'sql')
            data.staffs = data;
            res.render("staffs", { data: data });
        }
        functions.run(query, callback)

    } catch (error) {
        res.json(error.message)
    }
});


router.get("/addStaff", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let params = req.query
        if (params.id) {
            let query = functions.get('Staffs', { id: params.id })

            function callback(resp) {
                data.staff = resp[0];
                data.params = params.id;
                res.render("addStaff", { data: data });
            }
            functions.run(query, callback)
        } else {
            res.render("addStaff", { data: data });
        }

    } catch (error) {
        res.json(error.message)
    }
});

router.get("/products", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;

        let query = functions.get('Products', filters)

        function callback(data) {
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

router.get("/addProduct", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let params = req.query
        if (params.id) {
            let query = functions.get('Products', { id: params.id })

            function callback(resp) {
                data.product = resp[0];
                data.params = params.id;
                res.render("addProduct", { data: data });
            }
            functions.run(query, callback)
        } else {
            res.render("addProduct", { data: data });
        }

    } catch (error) {
        res.json(error.message)
    }
});

router.get("/pos", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;

        let query = functions.get('Products', filters)
        query += `ORDER BY Name ASC;`
        console.log(query)

        function callback(data) {
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


router.get("/sales", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;
        let server = req.session.passport.user
        // res.json(server)
        if(server.isAdmin == false){
            filters.Server = server.name
        }

        // filters.Server = authUser.Name

        let query = functions.get('Sales', filters)
        // res.json(req.session.passport.user)
       

        // query += `ORDER BY date_created DESC`
        // query += ` ORDER BY id DESC ORDER BY timestamp_column DESC`
        // res.json(query)

        function isObjectEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        if (isObjectEmpty(filters) || filters.Server !== null) {
            function callback(data) {
                // res.json(data)
                data.category = functions.getCategories
                data.authUser = req.session.passport.user
                res.render("all_sales", { data: data });
            }
            functions.getAllSalesData(callback, filters)
        } else {
            function callback(data) {
                console.log(data, 'sql')
                data.sales = data;
                data.category = functions.getCategories
                data.authUser = req.session.passport.user

                res.render("sales", { data: data });
            }
            functions.run(query, callback)
        }

    } catch (error) {
        res.json(error.message)
    }
});

router.post("/sales", checkAuth, async (req, res, next) => {
    try {
        let cart = req.body.payload;
        console.log(cart, "Received cart");

        let data = {};
        let filters = req.query;
        functions.salesStock(cart)

        let query = functions.insert('Sales', cart, {})

        res.json(cart);

        // functions.run(query, callback)

    } catch (error) {
        res.json(error.message)
    }
});

router.post("/sales/clear", checkAuth, async (req, res, next) => {
    let table = 'sales'
    let filter = req.body
    let data = { "Status": "CLEARED" }
    // data.id = 
    console.log(data)
    let query = functions.update(table, data, filter)

    function callback(data) { res.json(data) }
    functions.run(query, callback)
});


router.get("/sale", checkAuth, async (req, res, next) => {
    try {
        let data = {};
        let filters = req.query;

        let query = functions.get('Sales', filters)

        function callback(data) {
            // console.log(data, 'sql')
            data.sales = data;
            data.category = functions.getCategories
            data.authUser = req.session.passport.user
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

// router.post("/login", async (req, res, next) => {
//   let user = req.body
//   if(user.pin !== '1234'){
//     res.render("login");
//   }else{

//   req.session.authUser = authUser
//    res.redirect('/app')
//   }
// });

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// router.get("/logout", async (req, res, next) => {

//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Error destroying session:', err);
//         } else {
//             console.log('Session destroyed');
//             res.redirect('/login');
//         }
//     });
// });

module.exports = router;