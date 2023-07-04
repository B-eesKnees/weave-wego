const express = require("express");
const db = require("../db"); //db연결
let sql = require("../sql");

const router = express.Router();
//좋아요 수 순서대로 가져오기
router.post("/getLikeCourse", async (req, res) => {
  db.query(sql.getLikeCourse.query, (err, results) => {
      if (err) {
        res.send({ // 에러 발생 시
          'code': 400,
          'failed': 'error occurred',
          'error': err
        })
      } else {
        res.send(
          results
        )
      }
    })
});
//좋아요 수 순서대로 필터링..?
router.post('/getLikeFilter', async (req, res) => {
  const hashtags = req.body.hashtags; // 해시태그 배열 받기
  const search = req.body.search; // 검색어 받기

  const query = `
    SELECT b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE, b.BRD_REV,
      DATE_FORMAT(b.BRD_CREATED_AT, '%Y-%m-%d') AS CREATED_AT, b.BRD_VIEWCOUNT,
      (SELECT IMG_PATH FROM weavewego.image WHERE weavewego.image.IMG_NUM = b.BRD_ID LIMIT 1) AS IMG_PATH,
      COUNT(l.LL_ID) AS likecount
    FROM weavewego.board b
    LEFT JOIN weavewego.likelist l ON b.BRD_ID = l.LL_NUM
    WHERE BRD_OPEN = 'Y'
      ${generateHashtagConditions(hashtags)}
      ${generateSearchCondition(search)}
    GROUP BY b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE
    ORDER BY likecount DESC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).send(results);
  });
});

// 해시태그 조건 생성 함수
function generateHashtagConditions(hashtags) { //ai는 무적이다
  let conditions = '';

  if (hashtags.length > 0) {
    conditions = 'AND ('; //쿼리 시작점
    const likeConditions = hashtags.map((tag) => `BRD_HASHTAG LIKE '%${tag}%'`).join(' AND '); //배열에서 꺼내서 넣기 2개 이상이어야 join으로 ' and ' 로 묶음
    conditions += likeConditions; //넣고
    conditions += ')'; //쿼리 마무리
  }

  return conditions; //만들어진 쿼리 리턴
}

// 검색어 조건 생성 함수
function generateSearchCondition(search) { //제목과 내용 검색 관련
  let condition = ''; //쿼리 생성

  if (search) { //req.bodt에 serch가 있다면 
    condition = `AND (board.BRD_TITLE LIKE '%${search}%' OR board.BRD_REV LIKE '%${search}%')`;
  } //이 쿼리 추가

  return condition; //만들어진 쿼리 추가
}


//조회수 순대로 가져오기
router.post("/getViewsCourse", async (req, res) => {
  db.query(sql.getViewsCourse.query, (err, results) => {
      if (err) {
        res.send({ // 에러 발생 시
          'code': 400,
          'failed': 'error occurred',
          'error': err
        })
      } else {
        res.send(
          results
        )
      }
    })
});
//조회수 수 순서대로 필터링..?
router.post('/getViewsFilter', async (req, res) => {
  const hashtags = req.body.hashtags; // 해시태그 배열 받기
  const search = req.body.search; // 검색어 받기

  const query = `
    SELECT b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE, b.BRD_REV,
    DATE_FORMAT(b.BRD_CREATED_AT, '%Y-%m-%d') AS CREATED_AT, b.BRD_VIEWCOUNT,
    (SELECT IMG_PATH FROM weavewego.image WHERE weavewego.image.IMG_NUM = b.BRD_ID LIMIT 1) AS IMG_PATH,
    COUNT(l.LL_ID) AS likecount
    FROM weavewego.board b
    LEFT JOIN weavewego.likelist l ON b.BRD_ID = l.LL_NUM
    WHERE BRD_OPEN = 'Y'
    ${generateHashtagConditions(hashtags)}
    ${generateSearchCondition(search)}
    GROUP BY b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE
    order by b.BRD_VIEWCOUNT desc;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).send(results);
  });
});

// 해시태그 조건 생성 함수
function generateHashtagConditions(hashtags) { //ai는 무적이다
  let conditions = '';

  if (hashtags.length > 0) {
    conditions = 'AND ('; //쿼리 시작점
    const likeConditions = hashtags.map((tag) => `BRD_HASHTAG LIKE '%${tag}%'`).join(' AND '); //배열에서 꺼내서 넣기 2개 이상이어야 join으로 ' and ' 로 묶음
    conditions += likeConditions; //넣고
    conditions += ')'; //쿼리 마무리
  }

  return conditions; //만들어진 쿼리 리턴
}

// 검색어 조건 생성 함수
function generateSearchCondition(search) { //제목과 내용 검색 관련
  let condition = ''; //쿼리 생성

  if (search) { //req.bodt에 serch가 있다면 
    condition = `AND (board.BRD_TITLE LIKE '%${search}%' OR board.BRD_REV LIKE '%${search}%')`;
  } //이 쿼리 추가

  return condition; //만들어진 쿼리 추가
}
//최신순으로 가져오기
router.post("/getNewestCourse", async (req, res) => {
  db.query(sql.getNewestCourse.query, (err, results) => {
      if (err) {
        res.send({ // 에러 발생 시
          'code': 400,
          'failed': 'error occurred',
          'error': err
        })
      } else {
        res.send(
          results
        )
      }
    })
});
//최신순으로 필터링..?
router.post('/getNewestFilter', async (req, res) => {
  const hashtags = req.body.hashtags; // 해시태그 배열 받기
  const search = req.body.search; // 검색어 받기

  const query = `
    SELECT b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE, b.BRD_REV,
    DATE_FORMAT(b.BRD_CREATED_AT, '%Y-%m-%d') AS CREATED_AT, b.BRD_VIEWCOUNT,
    (SELECT IMG_PATH FROM weavewego.image WHERE weavewego.image.IMG_NUM = b.BRD_ID LIMIT 1) AS IMG_PATH,
    COUNT(l.LL_ID) AS likecount
    FROM weavewego.board b
    LEFT JOIN weavewego.likelist l ON b.BRD_ID = l.LL_NUM
    WHERE BRD_OPEN = 'Y'
    ${generateHashtagConditions(hashtags)}
    ${generateSearchCondition(search)}
    GROUP BY b.BRD_ID, b.BRD_WRITER, b.BRD_HASHTAG, b.BRD_NICK, b.BRD_TITLE
    order by b.BRD_CREATED_AT ASC;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).send(results);
  });
});

// 해시태그 조건 생성 함수
function generateHashtagConditions(hashtags) { //ai는 무적이다
  let conditions = '';

  if (hashtags.length > 0) {
    conditions = 'AND ('; //쿼리 시작점
    const likeConditions = hashtags.map((tag) => `BRD_HASHTAG LIKE '%${tag}%'`).join(' AND '); //배열에서 꺼내서 넣기 2개 이상이어야 join으로 ' and ' 로 묶음
    conditions += likeConditions; //넣고
    conditions += ')'; //쿼리 마무리
  }

  return conditions; //만들어진 쿼리 리턴
}

// 검색어 조건 생성 함수
function generateSearchCondition(search) { //제목과 내용 검색 관련
  let condition = ''; //쿼리 생성

  if (search) { //req.bodt에 serch가 있다면 
    condition = `AND (board.BRD_TITLE LIKE '%${search}%' OR board.BRD_REV LIKE '%${search}%')`;
  } //이 쿼리 추가

  return condition; //만들어진 쿼리 추가
}
//좋아요 관련 쿼리???
router.post("/likeCourse", async (req, res) => {
  const LL_ID = req.body.email;
  const LL_NUM = req.body.brdID;

  const like = {
    LL_ID,
    LL_NUM,
  };
  db.query(sql.likeCourse.query, like, (err, results) => {
    if (err) {
      res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      res.send({
        code: 200,
        message: "좋아요.",
      });
    }
  });
});
//좋아요 확인 쿼리?
// router.post('/checkLike', async (req, res) => {
//   const email = req.body.email;
//   let likeresult = '';
//   db.query(
//     `SELECT GROUP_CONCAT(LL_NUM SEPARATOR ',') AS "likeNum" FROM weavewego.likelist WHERE LL_ID = ?`,
//     [email],
//     (err, results) => {
//       if (err) {
//         res.send({
//           code: 400,
//           failed: "error occurred",
//           error: err,
//         });
//       } else {
//         for(i=0;results.length>i;i++) {
//           likeresult += results[i].likeNum;  //이러면 4,5 이런식으로 보내주는데 이게 맞나? 배열형식으로 보내야하나...
//         }
//         res.send(
//           likeresult
//         );
//       }
//     }
//   );
// });
//좋아요 확인 쿼리 예비용
router.post('/checkLike', async(req, res)=>{
  const email = req.body.email;

  db.query(`select group_concat(LL_NUM) as "좋아요누른 게시글 번호" from weavewego.likelist where LL_ID = ?;`, email, (err, results)=>{
    if(err) {
      res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      res.send(
        results
      )
    }
  })
})
//좋아요 취소 쿼리?
router.post("/dislikeCoures", async (req, res) => {
  const LL_ID = req.body.email;
  const LL_NUM = req.body.brdID;

  db.query(sql.dislikeCoures.query, [LL_ID, LL_NUM], (err) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        res.send({
          code: 200,
          message: "이제 싫어요.",
        });
      }
    }
  );
});
//조회수 늘어나는 쿼리? testttt
router.post("/increase", async (req, res) => {
  const brdID = req.body.brd_id;

  db.query(sql.increase.query, brdID, (err) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        res.send({
          code: 200,
        });
      }
    }
  );
});
//---최근 본 게시글 
router.post('/recentView', async (req, res)=>{
  const RC_NUM = req.body.brdID;
  const RC_VIEWER = req.body.email;

  const view = {
    RC_NUM,
    RC_VIEWER
  }

  db.query(sql.recentView.query, view, (err)=>{
    if(err) {
      res.send({
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      res.status(200).send("ok")
    }
  })
})

module.exports = router;
