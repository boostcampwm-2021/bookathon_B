const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

// env 파일의 변수들을 환경변수(process.env)로 등록해줌
require("dotenv").config();

const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const authRouter = require('./src/routes/auth');
const teamRouter = require('./src/routes/team');
const mailRouter = require('./src/routes/mail');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: '1q2w3e4r', resave:true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
require('./src/configs/passport')();

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/study',teamRouter);
app.use('/mail',mailRouter);

module.exports = app;
