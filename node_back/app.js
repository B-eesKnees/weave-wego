const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const app = express();
const axios = require('axios');
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser"); // 연주 추가
const bodyParser = require("body-parser"); // 연주 추가
const jwt = require("jsonwebtoken"); // 연주 추가
const convert = require('xml-js');
const nodemailer = require('nodemailer');
const router = express.Router();
const mailer = require('./mail');

const session = require("express-session");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

dotenv.config();
//git 테스트


app.use(cors({ origin: true, credentials: true }));
app.set("port", process.env.PORT || 3000); //포트 3000번으로 설정

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

const authRouter = require("./routes/auth"); //routes폴더
const mainRouter = require("./routes/main");
const boardMakeRouter = require("./routes/boardCreate");
const myPageRouter = require("./routes/mypage"); // 마이페이지
const postDataRouter = require("./routes/post");
const changeProfileRouter = require("./routes/profile");
const updateLikeRouter = require("./routes/updateLike");

const secretKey = "12345678abc";

app.use("/auth", authRouter); // /autu 로그인 관련 라우터
app.use("/", mainRouter); // 메인페이지 관련 라우터
app.use("/boardCreate", boardMakeRouter); //임시
app.use("/mypage", myPageRouter); // 마이페이지 관련 라우터
app.use("/postdata", postDataRouter);
app.use("/profile", changeProfileRouter);

app.use("/updatelike", updateLikeRouter);

app.get("/downloadProfile/:userEmail/:fileName", (req, res) => {
  //프로필 이미지 다운 라우터
  const {
    //url에 있는 userEmail, fileName 받아오기
    userEmail,
    fileName,
  } = req.params;
  const filepath = `${__dirname}/userProfile/${userEmail}/${fileName}`; //받아온 걸로 다운받을 경로 만들기 ex)/profiles/test@test.com/image.png
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  ); //이미지 보내는 코드인가?
  if (!fs.existsSync(filepath))
    res.send(404, {
      //경로에 이미지가 없으면 에러 처리
      error: "Can not found file.",
    });
  else fs.createReadStream(filepath).pipe(res); //파일 있으면 vue단으로 전송
});

app.post('/mail', (req, res)=>{
  const email = req.body.email;

  const verifyNum = Math.floor(Math.random()*888889 + 111111);
  // const payloadEmail = {email};
  
  // const token = jwt.sign(payloadEmail, secretKey, {expiresIn: "5m"});

  // const verificationLink = `http://localhost:3000/checkEmail/${token}`;

  let emailParam = {
    toEmail : email,
    subject : 'checkEmail Test mailer',
    html: `<html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>이메일 인증 코드</title>
          </head>
          <body style="background-color: #fafafa; display: flex; justify-content: center; align-items: center;">
            <div style="width: 40vw; border-radius: 10px; overflow: hidden; box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);">
              <div style="background-color: #4E4EFF; width: 100%; height: 60px;">
                <h1 style="font-size: 23px; font-family: 'Open Sans'; height: 60px; line-height: 60px; margin: 0; text-align: center; color: white;">
                이메일 인증 코드
                </h1>
              </div>
              <div style="width: 100%; height: 300px; display: flex; flex-direction: column; justify-content: space-around; align-items: center; flex-wrap: wrap; background-color: #fff; padding: 15px;">
                <p style="font-size: 20px; font-family: 'Open Sans'; text-align: center; color: #343434; margin-top: 0;">
                  아래의 인증 코드를 입력해 주세요
                </p>
                <div style="display: block; width: 60%; margin: 30px auto; background-color: #ddd; border-radius: 40px; padding: 20px; text-align: center; font-size: 36px; font-family: 'Open Sans'; letter-spacing: 10px; box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);">
                  <span style="display: block;">${verifyNum}</span>
                </div>
                <p style="font-size: 12px; text-align: center; color: #343434; margin-top: 0; font-style: italic; opacity: 0.3;">
                  인증코드 유효 시간은 10분입니다.
                </p>
              </div>
              <div style="width: 100%; height: 60px; background-color: #fff;"></div>
            </div>
          </body>
          </html>`
  };

  mailer.sendGmail(emailParam)
    .then(()=>{
      res.status(200).json({
        "message" : "success",
        "verifyNum" : verifyNum
      })
    })
    .catch((error)=>{
      res.status(401).send("에러" + error);
    })
});

app.post('/checkEmail', (req,res)=>{

  console.log(verifyNum);

  // try {
  //   const decode = jwt.verify(token, secretKey);

  //   console.log(decode);    
  //   console.log(decode.email);

  //   if(decode.email == 'bj3757@naver.com') {
  //     res.redirect('http://localhost:8080/');
  //   } else { 
  //     res.redirect('/errorPage'); 
  //   }
  // } catch(err) {
  //   if(err.name === "TokenExpiredError") {
  //     console.log("토큰 오류");
  //   } else if(err.name === "JsonWebTokenError") {
  //     console.log("위조 시도하는 중...");
  //   } else {
  //     console.log('예측못한 에러');
  //     console.log('===========================');
  //     console.log(err.name);
  //   }
  // }
});

app.post("/getAladin", (req, res) => { //클라이언트측에서 책이름으로 검색 시 실행됩니다.

  const bookTitle = req.body.bookname; //책 제목을 받아서 저장합니다.
  const url = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';
  const ttbkey = 'ttbbj37571606001'; //알라딘에서 부여한 고유번호입니다.
  const params = {
    ttbkey: ttbkey,
    QueryType: 'Title', //제목 검색입니다.
    MaxResults: 10, // 10개까지 검색합니다.
    start: 1,
    SearchTarget: 'Book',
    output: 'xml',
    Version: '20131101',
    Sort: "SalesPoint", //판매량 순으로 정렬했습니다 기본값은 관련도 입니다.
    Query: bookTitle, // 책 제목을 쿼리에 포함시킵니다.
  };

  axios.get(url, { params })
    .then(response => {
      // 여기서 받아온 데이터(response.data)를 원하는대로 처리합니다.
      let aladinJson = convert.xml2json(response.data, { compact: true, spaces: 4 }); //spaces: 4 공백 길이 라는데 뭔지 모르겠습니다.
      res.send(aladinJson); //xml2json 이용해서 json 형식으로 보내줍니다.
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    });
});

app.post("/downBookImage", (req, res)=>{ //책 이미지 받아올때 사용됩니다.
  // const isbn = req.body.isbn; //isbn 받아옵니다.
  // console.log(req.body.isbn);
  console.log(req.body.itemID);
  const id = req.body.itemID; //알리딘 책 api 
  const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx`;
  const ttbkey = 'ttbbj37571606001';
  const params = {
    ttbkey: ttbkey,
    ItemId : id,
    ItemIdType: 'ItemId',
    Cover : 'Big', //이게 시발 빅이야?
    Output : 'JS',
    Version : 20131101
  }

  axios.get(url, { params })
    .then(response =>{
      res.send(response.data); //근데 이미지 해상도가 너무 별로다 네이버를 병행해야할까?
    })
    .catch(err=>{
      res.status(401).send(err);
    })
  // axios.get("https://openapi.naver.com/v1/search/book_adv.xml", { //네이버 책 상세검색 api입니다.
  //   params: { d_isbn: isbn },
  //     headers: {
  //       "X-Naver-Client-Id": "21jTgTjyYK_UYwgjh73o",
  //       "X-Naver-Client-Secret": "1ZIfl_Whst"
  //     }
  // }).then((response)=>{
  //   const xmlData = response.data;
  //   const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 }); //json으로 바꿉니다.
  //   const bookData = JSON.parse(jsonData); //JSON.parse JSON형식의 문자열을 JSON형식으로 바꾸는 건데 왜 써야 작동할까요?
  //   const imageUrl = bookData.rss.channel.item.image._text; //isbn은 주민번호같은거라 배열 [0]같은거 안써도 됩니다 아마.

  //   // console.log(imageUrl);
  //   res.send(imageUrl); //이미지 주소 보내줍니다.
  // })
})

app.get("/downloadCourse/:courseId/:fileName", (req, res) => {
  //게시글 이미지 다운 라우터
  const {
    //url에 있는 userEmail, fileName 받아오기
    fileName
  } = req.params;
  const filepath = `${__dirname}/CourseImage/${fileName}`; //받아온 걸로 다운받을 경로 만들기 ex)/CourseImage/image.png
  console.log("filepath:", filepath);
  console.log("fileName:", fileName);
  console.log("-----------------------");
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}`
  ); //이미지 보내는 코드인가?
  if (!fs.existsSync(filepath)) {
    console.log("error");
    res.status(404).send((error = "Can not found file."));
  }
  else {fs.createReadStream(filepath).pipe(res);} //파일 있으면 vue단으로 전송
});

app.post("/uploadProfile/:userEmail/:fileName", async (req, res) => {
  //이용자 이미지 받아오는 라우터
  let { userEmail, fileName } = req.params; //url에 있는 userEmail, fileName 받아오기

  const dir = `${__dirname}/userProfile/${userEmail}`;
  const file = `${dir}/${fileName}`; //경로 만들기 ex)/profiles/test@test.com/image.png

  if (!req.body.data) {
    //전송받은거에 이미지 데이터가 없다면 오류 처리 (일어난적은 못봄)
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  }

  const data = req.body.data.slice(req.body.data.indexOf(";base64") + 8); //vue에서 전송될때 base64를 이용하여 전송해서 이런처리를 하는듯
  //왜 base64를 쓸까?

  if (!fs.existsSync(dir)) {
    //파일 경로가 없다면 ex)/profiles/test@test.com/image.png 생성하는 코드
    try {
      fs.mkdirSync(dir, { recursive: true }); //전체적으로 경로 만들게 하는 처리 /recursive: true
    } catch (err) {
      return res.send({
        //에러발생 시
        code: 400,
        failed: "error occurred while creating directory",
        error: err,
      });
    }
  }
  fs.writeFile(file, data, "base64", async (err) => {
    //이미지 넣는 코드인듯..?
    if (err) {
      res.send({
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      //에러가 발생안하면
      // DB에 이미지 파일명 업데이트 코드 추가
      db.query(
        "UPDATE weavewego.user SET USER_IMAGE = ? WHERE USER_EMAIL = ?",
        [fileName, userEmail],
        (err) => {
          //왜 insert가 아니라 update인가? 회원가입 처리후 실행되는 쿼리라 update를 사용
          if (err) {
            res.send({
              //에러처리
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send({
              //성공시 코드 전송 / 메시지는 안보내기로 합의완료
              code: 200,
            });
          }
        }
      );
    }
  });
});

app.post("/uploadCourse/:boardID/:fileName", async (req, res) => {
  // 게시글 이미지 데이터받는 라우터 작동하는지는 안해봄..
  let { boardID, fileName } = req.params;

  const dir = `${__dirname}/courseImage/${boardID}`;
  const file = `${dir}/${fileName}`;

  if (!req.body.data) {
    return fs.unlink(file, async (err) =>
      res.send({
        err,
      })
    );
  }

  const data = req.body.data.slice(req.body.data.indexOf(";base64") + 8);

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      return res.send({
        code: 400,
        failed: "error occurred while creating directory",
        error: err,
      });
    }
  }
  fs.writeFile(file, data, "base64", async (err) => {
    if (err) {
      res.send({
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      // DB에 이미지 파일명 업데이트 코드 추가
      db.query(
        "INSERT weavewego.image SET IMG_NUM = ?, IMG_PATH = ?",
        [boardID, fileName],
        (err) => {
          if (err) {
            res.send({
              code: 400,
              failed: "error occurred",
              error: err,
            });
          } else {
            res.send({
              code: 200,
              success: "image uploaded and user updated",
            });
          }
        }
      );
    }
  });
});

//---------------------------------------------------------------------------------
//게시글 수정 (이미지 추가 업로드)
app.post("/updateCourse/:boardID/:fileName", async (req, res) => {
  let { boardID, fileName } = req.params;

  const dir = `${__dirname}/CourseImage/${boardID}`;
  const file = `${dir}/${fileName}`;

  if (!req.body.data) {
    return res.status(400).send({
      code: 400,
      failed: "이미지 입력 값은 필수 입니다.",
    });
  }

  const data = req.body.data.slice(req.body.data.indexOf(";base64") + 8);
  const decodedData = Buffer.from(data, "base64");

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      return res.send({
        code: 400,
        failed: "디렉토리 생성 중 오류가 발생했습니다.",
        error: err,
      });
    }
  }

  try {
    await writeFileAsync(file, decodedData);
    // DB에 이미지 파일명 업데이트 코드 추가
    db.query(
      "INSERT INTO weavewego.image (IMG_NUM, IMG_PATH) VALUES (?, ?)",
      [boardID, `../CourseImage/${boardID}/${fileName}`],
      (err) => {
        if (err) {
          res.send({
            code: 400,
            failed: "이미지 정보 업데이트 중 오류가 발생했습니다.",
            error: err,
          });
        } else {
          res.send({
            code: 200,
            success: "이미지가 업로드되었습니다.",
          });
        }
      }
    );
  } catch (err) {
    res.status(400).send({
      code: 400,
      failed: "이미지 파일 저장 중 오류가 발생했습니다.",
      error: err,
    });
  }
});

//---------------------------------------------------------------------------------

//게시글 수정 (이미지 삭제)

app.delete("/deleteImage/:boardID/:imgID/:fileName", (req, res) => {
  const { boardID, imgID, fileName } = req.params;

  const dir = `${__dirname}/CourseImage/${boardID}`;
  const file = `${dir}/${fileName}`;

  fs.unlink(file, (err) => {
    if (err) {
      res.status(500).send({
        code: 500,
        error: "이미지 삭제 실패",
      });
    } else {
      db.query(
        "DELETE FROM image WHERE IMG_ID = ?",

        [imgID],
        (err, results) => {
          if (err) {
            res.status(500).send({
              code: 500,
              error: "이미지 업데이트에 실패했습니다.",
            });
          } else {
            res.status(200).send({
              code: 200,
              success: "이미지가 삭제되었습니다.",
            });
          }
        }
      );
    }
  });
});
//---------------------------------------------------------------------------------------------------------
//--대댓글 삽입 쿼리
app.post("/insertRecomment", (req, res) => {
  const recomment = {
    RCOM_NUM: req.body.com_id,
    RCOM_WRITER: req.body.email,
    RCOM_COMMENT: req.body.comment,
  };

  db.query(`insert into weavewego.recomment set ?`, recomment, (err) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send("대댓글 달기 성공");
    }
  });
});
//--대댓글 수정 쿼리
app.post("/updateRecomment", (req, res) => {
  const recomment = {
    RCOM_COMMENT: req.body.comment,
  };

  const recommentID = req.body.rcom_id;

  db.query(
    `update weavewego.recomment set ? ,RCOM_CREATED_AT = NOW() where RCOM_ID = ?`,
    [recomment, recommentID],
    (err) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send("수정 완료");
      }
    }
  );
});
//--대댓글 삭제 쿼리
app.post("/deleteRecomment", (req, res) => {
  const recom = req.body.rcom_id;

  db.query(
    `delete from weavewego.recomment where RCOM_ID = ?`,
    recom,
    (err) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send("삭제 완료");
      }
    }
  );
});
//--특정댓글에 대한 대댓글 불러오기
app.post("/getRecomment", (req, res) => {
  const comId = req.body.comId;

  db.query(
    `select r.RCOM_ID, r.RCOM_WRITER, r.RCOM_COMMENT, date_format(r.RCOM_CREATED_AT, "%Y-%m-%d") as 시간, u.USER_IMAGE, u.USER_NICKNAME
            from recomment r join user u on r.RCOM_WRITER = u.USER_EMAIL
            where r.RCOM_NUM = ? 
            order by 시간 asc`,
    comId,
    (err, results) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});
//---------------------------------------------------------------------------------------------------------
const adminRouter = require("./routes/admin"); //어드민 관련 라우터
const exp = require("constants");
app.use("/admin", adminRouter);

// 마이페이지
app.post("/mypage", (req, res) => {
  res.sendFile(path.join(__dirname, "/.html")); // 연결할 html 주소(마이페이지)
});

app.listen(app.get("port"), () => {
  //서버 연결
  console.log(app.get("port"), "번 대기중");
});
