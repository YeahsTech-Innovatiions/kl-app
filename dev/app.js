const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.use(
  cors({
    // origin: ["http://localhost:3001"],
    origin: "http://localhost:3000",
    credentials: true,
  })
);




app.use(bodyParser.json({ limit: "600mb" }));
app.use(bodyParser.urlencoded({ limit: "600mb", extended: true }));
// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const devapp = require("./controller/app");
const api = require("./controller/api");

app.use("/", devapp); 
app.use("/app", devapp); 
app.use("/api", api); 
  
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
