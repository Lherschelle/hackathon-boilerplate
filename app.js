var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const { sequelize, FOI } = require("./models/models");
const foiRouter = require("./routes/foiRouter");

var app = express();

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "njk");

nunjucks.configure(["node_modules/govuk-frontend/dist", "./views"], {
  autoescape: true,
  express: app,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/FOI", foiRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/category", (req, res) => {
  return res.render("category");
});

app.post("/category", async (req, res) => {
  let errors = {};

  if (!req.body.category) {
    errors.category = "Select an option";

    return res.render("category", {
      errors: errors,
    });
  }

  if (req.body.category === "FOI") {
    const foi = await FOI.create({});

    return res.redirect(`/FOI/${foi.id}/contact`);
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.status === 404) {
    return res.status(404).render("404");
  }

  res.status(err.status || 500);
  res.render("error");
});

module.exports = { app, FOI, sequelize };
