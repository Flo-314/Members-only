var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var loginRouter = require("./routes/login")
var signupRouter = require("./routes/singup")
var app = express();
var DB = require("./dbConnection")
let connection = DB.connection()
const session = require("express-session");
const passport = require("passport");
const pasportStrat = require("./controllers/pasport")
require("dotenv").config();






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));



app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
passport.use(pasportStrat.strategy)
passport.serializeUser(pasportStrat.serializeUser)
passport.deserializeUser(pasportStrat.deserializeUser)

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use("/log-in", loginRouter)
app.use("/sign-up", signupRouter)




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
