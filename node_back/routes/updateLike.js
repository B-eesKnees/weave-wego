const express = require("express");
const router = express.Router();
const db = require("../db");

//좋아요 증가 (감소)
router.post("/like/:boardId", (req, res) => {
  const { boardId } = req.params;
  //console.log(req.body.email);
  //console.log(req.body);
  const userEmail = req.body ? req.body.email : null; //req.body가 있으면 거기서 email 뽑아쓰고 없으면 null값 부여

  if (!userEmail) {
    //null 값이면
    //console.log(userEmail);
    res.status(401).json({ message: "로그인이 필요합니다." });
    return;
  }

  db.query(
    "SELECT * FROM likelist WHERE LL_NUM = ? AND LL_ID =?", //likelist 테이블에서 조회
    [boardId, userEmail], //게시글 번호 유저 이메일
    (err, results) => {
      if (err) {
        //에러 발생시
        console.error(err);
        res.status(500).json({ error: "좋아요 조회 오류" });
      } else {
        if (results.length > 0) {
          //조회되면
          db.query(
            "DELETE FROM likelist WHERE LL_NUM=? AND LL_ID=?",
            [boardId, userEmail],
            (err) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "좋아요 취소 실패" });
              } else {
                db.query(
                  "SELECT LL_NUM, COUNT(*) AS like_count FROM likelist WHERE LL_NUM =? GROUP BY LL_NUM",
                  [boardId],
                  (err, countResults) => {
                    if (err) {
                      console.error(err);
                      res
                        .status(500)
                        .json({ error: "좋아요 카운트 조회 오류" });
                    } else {
                      const likeCount =
                        countResults.length > 0
                          ? countResults[0].like_count
                          : 0;
                      // updateLikeCount(io, boardId, likeCount);
                      res.status(200).json({
                        message: "좋아요 취소 완료",
                        like_count: likeCount,
                      });
                    }
                  }
                );
              }
            }
          );
        } else {
          db.query(
            "INSERT INTO likelist (LL_NUM, LL_ID) VALUES (?,?)",
            [boardId, userEmail],
            (err) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: "좋아요 추가 오류" });
              } else {
                db.query(
                  "SELECT LL_NUM, COUNT(*) AS like_count FROM likelist WHERE LL_NUM=? GROUP BY LL_NUM",
                  [boardId],
                  (err, countResults) => {
                    if (err) {
                      console.error(err);
                      res
                        .status(500)
                        .json({ error: "좋아요 카운트 조회 오류" });
                    } else {
                      const likeCount =
                        countResults.length > 0
                          ? countResults[0].like_count
                          : 0;
                      // updateLikeCount(io, boardId, likeCount);
                      res.status(200).json({
                        message: "좋아요 추가 완료",
                        like_count: likeCount,
                      });
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

module.exports = router;
