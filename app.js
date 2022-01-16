var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var signupRouter = require("./routes/singup");
var logoutRouter = require("./routes/logout");
var createPostRouter = require("./routes/createpost");
var upgradeRouter = require("./routes/upgrade");
var app = express();
var DB = require("./dbConnection");
let connection = DB.connection();
const session = require("express-session");
const passport = require("passport");
const pasportStrat = require("./controllers/pasport");
var flash = require("connect-flash");
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
passport.use(pasportStrat.strategy);
passport.serializeUser(pasportStrat.serializeUser);
passport.deserializeUser(pasportStrat.deserializeUser);

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/log-in", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/log-out", logoutRouter);
app.use("/create-post", createPostRouter);
app.use("/upgrade", upgradeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
