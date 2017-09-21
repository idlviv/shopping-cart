let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressHBS = require('express-handlebars');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let session = require('express-session');

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

mongoose.connect('mongodb://brad:brad@ds143734.mlab.com:43734/shopping-cart', {useMongoClient: true})
  .then(
    () => console.log('Connected to db '),
    (err) => {
      console.log('Який з обробчиків помилок ловить? (err)');
      console.error('Failed to connect to db ');
      console.error('Error ' + err);
      // process.exit(1);
    })
  .catch(err => {
    console.log('Який з обробчиків помилок ловить? (catch)');
    console.error('Failed to connect to db ');
    console.error('Error ' + err);
    // process.exit(1);
  });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


app.engine('.hbs', expressHBS({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express-session({secret: 'secret', resave: 'false', }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
  res.render('error');
});

module.exports = app;
