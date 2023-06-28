const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const fs = require("fs");

//게시글 받아오기
router.get("/board", (req, res) => {
  const { boardId } = req.query;
  const query = `
  SELECT b.BRD_ID, b.BRD_WRITER, b.BRD_LOC_REV1, b.BRD_LOC_REV2, b.BRD_LOC_REV3,b.BRD_LOC_REV4, b.BRD_LOC_REV5, b.BRD_REV, COUNT(ll.LL_ID) AS Like_Count,b.BRD_HASHTAG, b.BRD_CREATED_AT., b.BRD_NICK
  FROM board b
  LEFT JOIN likelist ll ON b.BRD_ID = ll.LL_NUM
  WHERE b.BRD_ID =2;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버 에러" });
    } else {
      res.json({ board: results[0] });
    }
  });
});

//댓글 받아오기
router.get("/comments", (req, res) => {
  const { boardId } = req.query;
  const query = `SELECT c.COM_NICK,c.COM_IMAGE, c.COM_COMMENT, c.COM_CREATED_AT
                  FROM board b
                  JOIN comment c ON b.BRD_ID = c.COM_NUM
                  JOIN user u ON (b.BRD_WRITER = u.USER_EMAIL OR c.COM_WRITER = u.USER_EMAIL)
                  where b.BRD_ID=3;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버에러" });
    } else {
      res.json({ comments: results });
    }
  });
});

//장소 받아오기
router.get("/locations", (req, res) => {
  const { boardId } = req.query;
  const query = `SELECT b.BRD_ID, b.BRD_TITLE, l.LOC_NAME, l.LOC_LAT, l.LOC_LNG
                  FROM board b
                  JOIN location l ON b.BRD_ID = l.LOC_ID
                  WHERE b.BRD_ID=?;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버 에러" });
    } else {
      res.json({ locations: results });
    }
  });
});

//이미지 받아오기
router.get("/images", (req, res) => {
  const imagePath = "../board_img/푸바오1.jpg";
  const imageFullPath = path.join(__dirname, imagePath);

  fs.readFile(imageFullPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "이미지를 읽을 수 없습니다." });
    } else {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(data);
    }
  });
});

//팝업 운영시간
router.get("/locationpoptime", (req, res) => {
  const { boardId } = req.query;
  const query = `SELECT LOC_POP_TIME
                  FROM locationpop
                  ORDER BY rand()
                  LIMIT 1;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버 에러" });
    } else {
      res.json({ locationpoptime: results });
    }
  });
});

//팝업 이미지 받아오기
router.get("/locationpopimages", (req, res) => {
  const { boardId } = req.query;
  const query = `SELECT LOC_POP_IMG
                FROM locationpop
                ORDER BY rand()
                LIMIT ?;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ locationpopimages: results });
    }
  });
});

//게시글 삭제
router.get("/deleteboard", (req, res) => {
  const { boardId } = req.query;
  const query = `DELETE FROM board where BRD_ID=?`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ deleteboard: results });
    }
  });
});

//댓글 삭제
router.get("/deletecomments", (req, res) => {
  const { commentId } = req.query;
  const query = `DELETE FROM comment WHERE COM_ID=?;`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ deletecomment: results });
    }
  });
});

//댓글 수정

router.put("/updatecomments/", (req, res) => {
  const { commentId } = req.params;
  const updatedComment = req.body.updatedComment;

  const query = `update comment 
                set COM_COMMENT = "수정수정.", COM_CREATED_AT = NOW() 
                where COM_ID = 68`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버에러" });
    } else {
      if (!updatedComment) {
        res.status(400).json({ message: "댓글을 입력하세요." });
      } else {
        res
          .status(200)
          .json({ updatecomments: results, message: "댓글이 수정되었습니다." });
      }
    }
  });
});

module.exports = router;
