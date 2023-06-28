const express = require('express');
const db = require('../db'); //db연결
const bcrypt = require('bcrypt'); //암호화 관련 모듈

const router = express.Router();



// 쿼리 모음-----------------------------------------------------------------------------------------------------------------------------
const queries = {

  myPageQuery:  // 마이페이지 프로필 정보(아이디(이메일), 닉네임, 프로필 이미지)
    `select USER_EMAIL, USER_NICKNAME, USER_IMAGE
  from user
  where USER_EMAIL = ?;`,

  myCourseQuery:
    `select b.BRD_HASHTAG, b.BRD_TITLE, count(ll.LL_ID) as likecount, b.BRD_VIEWCOUNT, b.BRD_CREATED_AT, b.BRD_OPEN,
  (select i.IMG_PATH from image i where i.IMG_NUM = b.BRD_ID limit 1) as IMG_PATH
  from board b
  left join likelist ll on b.BRD_ID = ll.LL_NUM
  where b.BRD_WRITER = ?
  group by b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE
  order by BRD_CREATED_AT desc;`,

  delMyCourseQuery: `delete from board b where b.BRD_ID = ?`,

  recentCourseQuery:
    `select b.BRD_HASHTAG, b.BRD_TITLE, count(ll.LL_ID) as likecount, b.BRD_VIEWCOUNT, b.BRD_CREATED_AT,
  (select i.IMG_PATH from image i where i.IMG_NUM = b.BRD_ID limit 1) as IMG_PATH
  from board b
  left join likelist ll on b.BRD_ID = ll.LL_NUM
  left join recentview rv on b.BRD_ID = rv.RC_NUM
  where rv.RC_VIEWER = ?
  group by b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE, rv.RC_TIME
  order by rv.RC_TIME desc;`,

  likeListQuery:
    `select b.BRD_HASHTAG, b.BRD_TITLE, count(ll.LL_ID) as likecount, b.BRD_VIEWCOUNT, b.BRD_CREATED_AT,
  (select i.IMG_PATH from image i where i.IMG_NUM = b.BRD_ID limit 1) as IMG_PATH
  from board b
  left join likelist ll on b.BRD_ID = ll.LL_NUM
  where ll.LL_ID = ?
  group by b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE, ll.LL_TIME
  order by ll.LL_TIME desc;`,

  myCommentQuery:
    `select b.BRD_TITLE, com.COM_COMMENT, com.COM_CREATED_AT
  from comment com
  left join board b on com.COM_NUM = b.BRD_ID
  where com.COM_WRITER = ?
  order by com.COM_CREATED_AT desc;`,

  delmyCommentQuery: `delete from comment com where com.COM_ID in (?)`
}
//------------------------------------------------------------------------------------------------------------------------------------

// 데이터베이스 작업 함수
const req = async (query, params) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (error, rows) => {
      if (error) {
        console.log(error);
        resolve({ error });
      } else {
        resolve(rows);
      }
    });
  });
};



// 프로필 정보 보내주기
router.post('/myPage', async (request, res) => {
  try {
    const userEmail = request.body.userEmail;

    res.send(await req(queries.myPageQuery, userEmail));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});

// 내 코스에 내가 쓴 글 출력
router.post('/myCourse', async (request, res) => {
  try {
    const userEmail = request.body.userEmail;

    res.send(await req(queries.myCourseQuery, userEmail));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});

// 내 코스 선택 삭제
router.get('/delMyCourse', async (request, res) => {
  try {
    const delBoard = [];  // 게시판 아이디 어떻게 받아아ㅏㅏ와아아악

    res.send(await req(queries.delMyCourseQuery, [delBoard]));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});


// 최근에 본 코스
router.post('/recentCourse', async (request, res) => {  
  try {
    const userEmail = request.body.userEmail;

    res.send(await req(queries.recentCourseQuery, userEmail));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});


// 좋아요 리스트 글 출력
router.post('/likeList', async (request, res) => {
  try {
    const userEmail = request.body.userEmail;

    res.send(await req(queries.likeListQuery, userEmail));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});


// 내가 쓴 댓글 출력
router.post('/myComment', async (request, res) => {
  try {
    const userEmail = request.body.userEmail;

    res.send(await req(queries.myCommentQuery, userEmail));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});


// 내 댓글 삭제
router.get('/delmyComment', async (request, res) => {
  try {
    const delCom = [15, 16];

    res.send(await req(queries.delmyCommentQuery, [delCom]));
  } catch (err) {
    res.status(500).send({
      error: err
    });
  }
});


// db 설정
const mysql = require('mysql');

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'weavewego',
});

/* const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) => dbPool.query(sql.myPageQuery, param, (error, rows) => {
      if (error) {
        if (error.code != 'ER_DUP_ENTRY')
          console.log(error);
        resolve({
          error
        });
      } else resolve(rows);
    }));
  }
}; */


module.exports = router;