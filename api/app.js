const  express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//Enable CORS for same origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept,Cache-Control,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
  next();
});

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/diary')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

let index = require('./routes/index');
let diarys = require('./routes/diary');

app.use('/', index);
app.use('/diarys', diarys);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});


module.exports = app;
