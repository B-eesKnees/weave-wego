const express = require('express');
const cors = require('cors');
const db = require('./db');

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
const boardMakeRouter = require('./routes/boardCreate');

app.use('/auth', authRouter); // /autu 로그인 관련 라우터 
app.use('/', mainRouter); // 메인페이지 관련 라우터
app.use('/boardCreate', boardMakeRouter); //임시

app.get('/downloadProfile/:userEmail/:fileName', (req, res) => {
    const {
      userEmail,
      fileName
    } = req.params;
    const filepath = `${__dirname}/profiles/${userEmail}/${fileName}`;
    res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf("."))}`);
    if (!fs.existsSync(filepath)) res.send(404, {
      error: 'Can not found file.'
    });
    else fs.createReadStream(filepath).pipe(res);
  });

  app.post('/uploadProfile/:userEmail/:fileName', async (req, res) => {
    let { userEmail, fileName } = req.params;
  
    const dir = `${__dirname}/profiles/${userEmail}`;
    const file = `${dir}/${fileName}`;
  
    if (!req.body.data) {
      return fs.unlink(file, async (err) => res.send({
        err
      }));
    }
  
    const data = req.body.data.slice(req.body.data.indexOf(';base64') + 8);
  
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (err) {
        return res.send({
          'code': 400,
          'failed': 'error occurred while creating directory',
          'error': err
        });
      }
    }
    fs.writeFile(file, data, 'base64', async (err) => {
      if (err) {
        res.send({
          'code': 400,
          'failed': 'error occurred',
          'error': err
        });
      } else {
        // DB에 이미지 파일명 업데이트 코드 추가
        db.query('UPDATE weavewego.user SET USER_IMAGE = ? WHERE USER_EMAIL = ?', [fileName, userEmail], (err) => {
          if (err) {
            res.send({
              'code': 400,
              'failed': 'error occurred',
              'error': err
            });
          } else {
            res.send({
              'code': 200,
              'success': 'image uploaded and user updated'
            });
          }
        });
      }
    });
  });

  app.post('/uploadCourse/:boardID/:fileName', async (req, res) => {
    let { boardID, fileName } = req.params;
  
    const dir = `${__dirname}/courseImage/${boardID}`;
    const file = `${dir}/${fileName}`;
  
    if (!req.body.data) {
      return fs.unlink(file, async (err) => res.send({
        err
      }));
    }
  
    const data = req.body.data.slice(req.body.data.indexOf(';base64') + 8);
  
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (err) {
        return res.send({
          'code': 400,
          'failed': 'error occurred while creating directory',
          'error': err
        });
      }
    }
    fs.writeFile(file, data, 'base64', async (err) => {
      if (err) {
        res.send({
          'code': 400,
          'failed': 'error occurred',
          'error': err
        });
      } else {
        // DB에 이미지 파일명 업데이트 코드 추가
        db.query('INSERT weavewego.image SET IMG_NUM = ?, IMG_PATH = ?', [boardID, fileName], (err) => {
          if (err) {
            res.send({
              'code': 400,
              'failed': 'error occurred',
              'error': err
            });
          } else {
            res.send({
              'code': 200,
              'success': 'image uploaded and user updated'
            });
          }
        });
      }
    });
  });

app.listen(app.get('port'),()=>{ //서버 연결
    console.log(app.get('port'),'번 대기중');
});


