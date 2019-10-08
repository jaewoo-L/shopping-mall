var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var User 				  = require('./models/user');
var	localStrategy         = require('passport-local');
// var	localStrategy         = require('passport-local').Strategy;
var	passportLocalMongoose = require('passport-local-mongoose');



var moviesRouter = require('./routes/movies'); 
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var productsRouter = require('./routes/products');
require('dotenv').config();

var app = express();
app.use(cors({credentials: true, origin: 'http://localhost:8080'}))

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

const PostSchema = new mongoose.Schema({
	title: String,
	description: String
});
const Post = mongoose.model("Post", PostSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use('/', indexRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/login', loginRouter);
app.use('/api/products', productsRouter);
app.get('/exercise', async (req, res) => {
	let post = await Post.create({title:'Test', description:'This is a Test'})
	res.json(post);
});

//===================================
// app.get('/', function(req,res){
// 	res.render('home');
// });

// app.get('/secret',isloggedIn ,function(req,res){
// 	res.render('secret');
// });


// //===========
// //Auth Routes
// //===========
// //show sign up form
// app.get('/register',function(req,res){
// 	res.render('register');
// });
// //handling user sign up
// app.post('/register',function(req,res){
// 	//새로운 사용자를 등록합니다.register
// 	//새로운 user를 database에 저장합니다. 단 username만 저장하고 실제 비밀번호는 저장하지 않는다 이는 좋지 않은방법이다.
// 	//비밀번호는 해싱되어 거대문자로 바뀌어 DB에 저장한다. 성곡적으로 끝나고 나면 정보를 담고있는 user객체를 반환해준다.
// 	//register method는 passport-local-mongoose패키지에 의해 db의실제 데이터 구조가 재구성되어있다. 실제password는 저장하지 않는다.
// 	User.register(new User({username: req.body.username}), req.body.password, function(err,user){
// 		if(err){
// 			console.log(err);
// 			return res.render('register');
// 		}else{
// 			//local 대신 titwer facebook등 다양한 app과 인증을 연동할 수 있으나 앱을 등록하고 그들에게 허락을 받아야한다.
// 			//passport에서 local에 대한 인증 작업을 시작합니다. LocalStrategy(require(express-local))패키지 설치했음. 를 사용해서요. 
// 			//passport.authenticate("local", {failureRedirect:'/'})(req,res,function(){res.redirect('/')});
// 			passport.authenticate("local")(req, res, function(){
// 				res.redirect('/secret');
// 			});
// 		}
// 	});
// });

// //LOGIN ROUTE
// app.get('/login', function(req,res){
// 	//render login form
// 	res.render('login');
// });
// //login logic
// //위에서 passport.authenticate를 callback 함수 안에서 사용했지만 여기서는 그렇게 사용하지 않고있다. 여기서는 '미들웨어'로 사용되었다.
// //미들웨어에 대한 아이디어는 여기 가운데에 설명하겠다. 여기서 우리가 작성한 코드는 우리의 마지막 경로 콜백 전에 실행된다. 그래서 미들웨어라고 불린다.
// //로그인하라는 포스트 요청을 받으면 이 코드를 즉시 실행할 것이고 여러 개의 미들웨어가 쌓여 우리가 인증한 후에 실행될 또 다른 것을 가질 수 있다.
// app.post('/login', passport.authenticate("local",{
// 	successRedirect: "/secret",
// 	failureRedirect: "/login"
// }) ,function(req, res){	
// });

// //logout
// app.get('/logout', function(req,res){
// 	req.logout();
// 	res.redirect('/');
// });

// function isloggedIn(req, res, next){
// 	//req의isAuthenticated() 메소드를 호출하여 로그인되어있는지 확인하고 로그인 되어있으면 다음으로 넘어가게하라(여기서는 callback함수)
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect('/login');
// }

//====================================

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
