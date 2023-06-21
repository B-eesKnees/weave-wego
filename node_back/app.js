const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
const morgan = require('morgan');
const dotenv = require('dotenv');

const session = require('express-session');
const fs = require('fs');

dotenv.config();


const app = express();
let corsOption = {
    origin: 'http://localhost:8080',
    credentials: true,
}
app.use(cors(corsOption));
app.set('port', process.env.PORT || 3000); //포트 3000번으로 설정

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

const authRouter = require('./routes/auth'); //routes폴더
const mainRouter = require('./routes/main');

app.use('/auth', authRouter); // /autu 로그인 관련 라우터 
app.use('/', mainRouter); // 메인페이지 관련 라우터

app.get('/download/:userEmail/:fileName', (req, res) => {
    const {
      userEmail,
      fileName
    } = req.params;
    const filepath = `${__dirname}/userProfile/${userEmail}/${fileName}`;
    res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
    if (!fs.existsSync(filepath)) res.send(404, {
      error: 'Can not found file.'
    });
    else fs.createReadStream(filepath).pipe(res);
  });

app.listen(app.get('port'),()=>{ //서버 연결
    console.log(app.get('port'),'번 대기중');
});
