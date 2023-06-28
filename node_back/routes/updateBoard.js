const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const fs = require("fs");

//게시글 내용 수정--------------------------------------------------------
router.put("/updateboard", (req, res) => {
  const { boardId } = req.params;
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

  const query = `UPDATE BOARD SET BRD_TITLE = 'ㅎㅇ', BRD_HASHTAG = '#ㅎㅇ', BRD_LOC_REV1 = 'ㅎㅇ', BRD_LOC_REV2 = 'ㅎㅇ', BRD_LOC_REV3 = 'ㅎㅇ', BRD_LOC_REV4 = 'ㅎㅇ', BRD_LOC_REV5 = 'ㅎㅇ', BRD_REV = 'ㅎㅇ',BRD_CREATED_AT=NOW() WHERE BRD_ID = 2;`;

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

//이미지 추가(진행중)--------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/"); //이미지를 저장할 폴더 설정
  },
});
router.post("/addimage", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400).json({ error: "이미지 업로드 실패했습니다." });
    return;
  }
  const uploadPath = "./uploads/";
  req.files.forEach((file) => {
    const filename = file.originalname;
    const filePath = uploadPath + filename;

    file;
  });
  res.json({ imageUrls, message: "이미지 업로드가 완료되었습니다." });

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ addimage: results });
    }
  });
});

//----------------------이미지삭제
router.delete("/deleteimage", (req, res) => {
  const { boardId } = req.query;
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
