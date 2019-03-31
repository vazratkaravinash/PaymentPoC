const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user/user");
var adminRouter = require("./routes/user/admin");

var redis = require("redis");
var session = require("express-session");
var hbs = require("express-handlebars");
var log4js = require("log4js");
var client = redis.createClient();
var redisStore = require("connect-redis")(session);
var app = express();

//logger
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.engine("hbs", hbs({
	extname: "hbs",
	defaultLayout: "main",
	layoutsDir: __dirname + "/views/layouts"
}));

//session
//session and body parser
app.use(session({
	secret: "ssshhhhh",
	store: new redisStore({ host: "localhost", port: 6379, client: client, ttl: 260 }),
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 18000000
	}
}));

//routes
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/admin", adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
