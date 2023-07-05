const express = require("express");
const db = require("../db"); //db연결

const router = express.Router();
//본문
router.post("/boardform", (req, res) => {
  const {
    writer,
    title,
    loc_rev1,
    loc_rev2,
    loc_rev3,
    loc_rev4,
    loc_rev5,
    rev,
    hashtag,
    nick,
    open,
    created_at,
  } = req.body;

  const course = {
    BRD_WRITER: writer,
    BRD_TITLE: title,
    BRD_LOC_REV1: loc_rev1,
    BRD_LOC_REV2: loc_rev2,
    BRD_LOC_REV3: loc_rev3,
    BRD_LOC_REV4: loc_rev4,
    BRD_LOC_REV5: loc_rev5,
    BRD_REV: rev,
    BRD_HASHTAG: hashtag,
    BRD_NICK: nick,
    BRD_OPEN: open,
    BRD_CREATED_AT: created_at,
  };
  const query = `INSERT INTO board (BRD_WRITER, BRD_TITLE, BRD_LOC_REV1, BRD_LOC_REV2, BRD_LOC_REV3, BRD_LOC_REV4, BRD_LOC_REV5, BRD_REV, BRD_HASHTAG, BRD_NICK, BRD_OPEN,BRD_CREATED_AT) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_FORMAT(NOW(), '%Y-%m-%d'))`;

  db.query(query, course, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: " 글 작성 중 오류가 발생했습니다." });
    } else {
      const redirectPath = "/어쩌고";
      res.redirect(redirectPath);
    }
  });
});

//댓글

router.post("/commentform", (req, res) => {
  const { num, writer, created_at, nick, image, comment } = req.body;

  const courseComment = {
    COM_NUM: num,
    COM_WRITER: writer,
    COM_CREATED_AT: created_at,
    COM_NICK: nick,
    COM_IMAGE: image,
    COM_COMMENT: comment,
  };

  const query = `insert into comment (COM_NUM, COM_WRITER,  COM_CREATED_AT, COM_NICK, COM_IMAGE, COM_COMMENT) VALUES (?,?,?,DATE_FORMAT(NOW(), '%Y-%m-%d'),?,?,?)`;

  // 댓글을 데이터베이스에 저장하는 코드
  db.query(query, courseComment, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "댓글 작성 중 오류가 발생했습니다." });
    } else {
      const redirectPath = "/저쩌고";
      res.redirect(redirectPath);
    }
  });
});

//장소
router.post("/locationform", (req, res) => {
  const { id, name, lat, lng, add } = req.body;

  const courseLocation = {
    LOC_ID: id,
    LOC_NAME: name,
    LOC_LAT: lat,
    LOC_LNG: lng,
    LOC_ADD: add,
  };

  const query = `insert into location (LOC_ID, LOC_NAME ,LOC_LAT ,LOC_LNG ,LOC_ADD) VALUES (?,?,?,?,?)`;

  db.query(query, courseLocation, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "에러발생" });
    } else {
      res.end();
    }
  });
});
//이미지
router.post("/imageform", (req, res) => {});

module.exports = router;
