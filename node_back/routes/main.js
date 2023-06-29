const express = require("express");
const db = require("../db"); //db연결

const router = express.Router();
//좋아요 수 순서대로 가져오기
router.post("/getLikeCourse", async (req, res) => {
  db.query(
    `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                where board.BRD_OPEN = 0
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by likecount desc;`
    , (err, results) => {
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
//조회수 순대로 가져오기
router.post("/getViewsCourse", async (req, res) => {
  db.query(
    `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                where board.BRD_OPEN = 0
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_VIEWCOUNT desc;`
    , (err, results) => {
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
//최신순으로 가져오기
router.post("/getNewestCourse", async (req, res) => {
  db.query(
    `SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, date_format(board.BRD_CREATED_AT, '%Y-%m-%d') as BRD_CREATED, board.BRD_REV ,board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                where board.BRD_OPEN = 0
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_CREATED_AT ASC;`
    , (err, results) => {
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
//좋아요 관련 쿼리???
router.post("/likeCourse", async (req, res) => {
  const LL_ID = req.body.email;
  const LL_NUM = req.body.brdID;

  const like = {
    LL_ID,
    LL_NUM,
  };
  db.query(`insert into weavewego.likelist set ?`, like, (err, results) => {
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
router.post('/checkLike', async (req, res) => {
  const email = req.body.email;
  let likeresult = '';
  db.query(
    `SELECT GROUP_CONCAT(LL_NUM SEPARATOR ',') AS "likeNum" FROM weavewego.likelist WHERE LL_ID = ?`,
    [email],
    (err, results) => {
      if (err) {
        res.send({
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        for(i=0;results.length>i;i++) {
          likeresult += results[i].likeNum;  //이러면 4,5 이런식으로 보내주는데 이게 맞나? 배열형식으로 보내야하나...
        }
        res.send(
          likeresult
        );
      }
    }
  );
});
//좋아요 확인 쿼리 예비용
// router.post('/checkLike', async(req, res)=>{
//   const email = req.body.email;

//   db.query(`select group_concat(LL_NUM) as "좋아요누른 게시글 번호" from weavewego.likelist where LL_ID = ?;`, email, (err, results)=>{
//     if(err) {
//       res.send({
//         // 에러 발생 시
//         code: 400,
//         failed: "error occurred",
//         error: err,
//       });
//     } else {
//       res.send(
//         results
//       )
//     }
//   })
// })
//좋아요 취소 쿼리?
router.post("/dislikeCoures", async (req, res) => {
  const LL_ID = req.body.email;
  const LL_NUM = req.body.brdID;

  db.query(
    `delete from weavewego.likelist where LL_ID = ? AND LL_NUM = ?`,
    [LL_ID, LL_NUM],
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
          message: "이제 싫어요.",
        });
      }
    }
  );
});
//조회수 늘어나는 쿼리? testttt
router.post("/increase", async (req, res) => {
  const brdID = req.body.brd_id;

  db.query(
    `UPDATE weavewego.board
            SET BRD_VIEWCOUNT = BRD_VIEWCOUNT + 1
            WHERE BRD_ID = ?;`,
    brdID,
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

  db.query(`insert into weavewego.recentview set ?`, view, (err)=>{
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
