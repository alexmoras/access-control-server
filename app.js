require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config');

const authRouter = require('./routes/auth');
const cardsResourceRouter = require('./routes/resources/cards');
const clientsResourceRouter = require('./routes/resources/clients');
//const usersResourceRouter = require('./routes/resources/users');
const checkRouter = require('./routes/check');
//const logRouter = require('./routes/log');

const app = express();
app.use(session({ secret: config.session }));

const dbUrl = "mongodb+srv://" + config.database.user + ":" + config.database.pass + "@" + config.database.host +
    "/" + config.database.name;
console.log("URL " + dbUrl);
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
  useFindAndModify: false })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Database connected successfully.");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/cards', cardsResourceRouter);
app.use('/clients', clientsResourceRouter);
//app.use('/users', usersResourceRouter);
app.use('/check', checkRouter);
//app.use('/log', logRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
