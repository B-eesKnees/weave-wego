const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

//게시글 내용 수정--------------------------------------------------------
router.put("/updateboard", (req, res) => {
  const boardId = req.params.boardId;
  const {
    title,
    hashtag,
    loc1rev,
    loc2rev,
    loc3rev,
    loc4rev,
    loc5rev,
    locrev,
    createdat,
  } = req.body;

  const query = `UPDATE BOARD SET BRD_TITLE = ?, BRD_HASHTAG = ?, BRD_LOC_REV1 = ?, BRD_LOC_REV2 = ?, BRD_LOC_REV3 = ?, BRD_LOC_REV4 = ?, BRD_LOC_REV5 = ?, BRD_REV = ?,BRD_CREATED_AT=NOW() WHERE BRD_ID = ?;`;

  const values = [
    title,
    hashtag,
    loc1rev,
    loc2rev,
    loc3rev,
    loc4rev,
    loc5rev,
    locrev,
    createdat,
    boardId,
  ];
  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "서버에러" });
    } else {
      //res.redirect("/postdata/board?boardid=2");
      res.status(200).json({
        updateboard: results,
        message: "게시글 수정이 완료되었습니다.",
      });
    }
  });
});

//----------------------이미지삭제
router.delete("/deleteimage", (req, res) => {
  const boardId = req.query;
  const query = `DELETE FROM image WHERE IMG_ID=<img_id>;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ locationpopimages: results });
    }
  });
});
