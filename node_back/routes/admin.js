const express = require("express");
const db = require("../db"); //db연결

const router = express.Router();
//-----------------------------------신고된 게시글 보기
router.post("/reportCourse", async (req, res) => {
  db.query(
    `SELECT b.BRD_TITLE, (select u.USER_NICKNAME from user u where b.BRD_WRITER = u.USER_EMAIL)as BRD_NICK, b.BRD_WRITER, date_format(BRD_CREATED_AT, '%Y-%m-%d %H:%i') as BRD_CREATED, b.BRD_VIEWCOUNT, count(ll.LL_ID) as likecount, b.BRD_OPEN,b.BRD_ID,BRD_REPORT
    FROM board b 
    left join likelist ll on b.BRD_ID = ll.LL_NUM 
    join user u on b.BRD_WRITER = u.USER_EMAIL
    where BRD_REPORT = 1
    group by b.BRD_ID
    order by b.BRD_CREATED_AT DESC`,
    (err, results) => {
      //report가 1이면 출력시키는 쿼리
      if (err) {
        res.send({
          // 에러 발생 시
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        res.send(
          results //배열 형식으로 보내줌
        );
      }
    }
  );
});
//-----------------------------------신고된 댓글 보기
router.post("/reportComment", async (req, res) => {
  db.query(
    `select c.COM_NICK, c.COM_ID, c.COM_NUM, c.COM_COMMENT, date_format(COM_CREATED_AT, '%Y-%m-%d %H:%i') as COM_CREATED_AT, (select u.USER_NICKNAME from user u where c.COM_WRITER = u.USER_EMAIL), c.COM_WRITER, c.COM_REPORT, u.USER_EMAIL, u.USER_IMAGE
    from comment c 
    join user u on c.COM_WRITER = u.USER_EMAIL
    where COM_REPORT = 1
    order by c.COM_CREATED_AT DESC`,
    (err, results) => {
      if (err) {
        res.send({
          // 에러 발생 시
          code: 400,
          failed: "error occurred",
          error: err,
        });
      } else {
        res.send(
          results //배열 형식으로 보내줌
        );
      }
    }
  );
});
//----------------------------------신고된 게시글 삭제 여러개 한번에 지우기?
router.post("/deleteCourse", async (req, res) => {
  const deleteCourses = req.body.CourseID; //ex) [1,2,3] 형식으로 날라오면 가능한가??

  db.query(
      `delete from weavewego.board where BRD_ID in (?)`,
      [deleteCourses],
      (err) => {
        //쿼리문 반복 실행
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.status(200).send({"message": "성공"})
        }
      }
    );
  });
//----------------------------------신고된 댓글 삭제 여러개 한번에 지우기?
router.post("/deleteComment", async (req, res) => {
  const deleteComments = req.body.commentID; //ex) [1,2,3] 형식으로 날라오면
  console.log(deleteComments); 
    db.query(
      `delete from weavewego.comment where COM_ID in (?)`,
      [deleteComments],
      (err) => {
        //쿼리문 반복 실행
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.status(200).send({"message" : "성공"});
        }
      }
    );
  });
//-----------글 목록 보기
router.post(`/viewBoardlist`, async (req, res) => {
  db.query(`SELECT b.BRD_TITLE, (select u.USER_NICKNAME from user u where b.BRD_WRITER = u.USER_EMAIL) as BRD_NICK, b.BRD_WRITER, date_format(BRD_CREATED_AT, '%Y-%m-%d %H:%i') as BRD_CREATED, b.BRD_VIEWCOUNT, count(ll.LL_ID) as likecount, b.BRD_OPEN,b.BRD_ID 
            FROM board b 
            left join likelist ll on b.BRD_ID = ll.LL_NUM 
            join user u on b.BRD_WRITER = u.USER_EMAIL
            group by b.BRD_ID
            order by b.BRD_CREATED_AT DESC;`, (err, results) => {
    if (err) {
      res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      res.send(results);
    }
  });
});
//-----------회원 정보 보기
router.post(`/viewUserlist`, async (req, res) => {
  db.query(`select USER_IMAGE, USER_NICKNAME, USER_EMAIL, USER_AGEGROUP, DATE_FORMAT(USER_REGDATE, "%Y-%m-%d %H:%i") AS USER_REGDATE, USER_PHONE, USER_PROVIDER from weavewego.user order by USER_REGDATE DESC`, (err, results) => {
    if (err) {
      res.send({
        // 에러 발생 시
        code: 400,
        failed: "error occurred",
        error: err,
      });
    } else {
      res.send(results);
    }
  });
});
//----------------------------------유저 탈퇴시키기
router.post("/deleteUser", async (req, res) => {
  const deleteUsers = req.body.userEmail; //ex) [1,2,3] 형식으로 날라오면
  console.log(deleteUsers); 
    db.query(
      `delete from weavewego.user where USER_EMAIL in (?)`,
      [deleteUsers],
      (err) => {
        //쿼리문 반복 실행
        if (err) {
          res.send({
            // 에러 발생 시
            code: 400,
            failed: "error occurred",
            error: err,
          });
        } else {
          res.status(200).send({"message" : "성공"});
        }
      }
    );
  });
module.exports = router;
