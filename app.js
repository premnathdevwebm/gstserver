const express = require("express");
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
require('./models/db')
require('./config/passport')
require('./controllers/commision')
const app = express();

const routesApi = require("./routes")

const port = process.env.PORT || 3001;


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());

app.use("/", routesApi);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    err.status = 401;
   return res.json({ message: `${err.name} : ${err.message}` });
  }
  next(err);
});
app.use((err, req, res, next) => {
    err.status = err.status || 500;
    return res.json({ message: `${err.name} : ${err.message}` });
});

//
app.listen(port, () => console.log(`app listening on port ${port}!`));
