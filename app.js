const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const appRouter = require("./routes/allRoutes");
const { error } = require("console");
const { default: mongoose } = require("mongoose");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//connetion to mongDb
const mongodbURI =
  "mongodb+srv://essohalou:dbConnectionC@node-blog.ccomzyl.mongodb.net/?retryWrites=true&w=majority";
main().catch((error) => console.log(error));
async function main() {
  await mongoose.connect(mongodbURI);
  console.log("successfull connection to db");
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use("/", indexRouter);
app.use("/", appRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
