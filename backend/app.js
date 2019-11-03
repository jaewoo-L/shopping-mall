var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var methodOverride = require('method-override');
var session = require('express-session');
var User 				  = require('./models/user');
var	localStrategy         = require('passport-local');
var	passportLocalMongoose = require('passport-local-mongoose');
 
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var productsRouter = require('./routes/products');
var commentRouter = require('./routes/comments');
require('dotenv').config();

var app = express();

//vue를 통한 앱이 적절한 서버 설정이 없는 단일 페이지이기 때문에 사용자가 직접 url에 상세주소를 입력하면 오류가 뜬다. 
//이때 이를 해결하기 위한 패키지가 아래와 같다.
app.use(require('connect-history-api-fallback')());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(()=> {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('Error:', err.message);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("rtyhsx2"));


app.use(session({
	secret:"rtyhsx2",
	resave:true,
	saveUninitialized: true, 
	cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/api/login', loginRouter);
app.use('/api/products', productsRouter);
app.use("/api/products/:id/comments", commentRouter);

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
