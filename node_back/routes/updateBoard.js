const express = require("express");
const router = express.Router();
const db = require("../db");
const path = require("path");
const fs = require("fs");

// router.put("/updatecomments/", (req, res) => {
//   const { commentId } = req.params;
//   const updatedComment = req.body.updatedComment;

//   const query = `update comment
//                 set COM_COMMENT = '수정된 댓글입니다.'
//                 where COM_ID = 52`;
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "서버에러" });
//     } else {
//       if (!updatedComment) {
//         res.status(400).json({ message: "댓글을 입력하세요." });
//       } else {
//         res
//           .status(200)
//           .json({ updatecomments: results, message: "댓글이 수정되었습니다." });
//       }
//     }
//   });
// });

router.put("/updateboard", (req, res) => {
  const { boardId } = req.params;
  const {
    open,
    title,
    hashtag,
    loc1rev,
    loc2rev,
    loc3rev,
    loc4rev,
    loc5rev,
    boardrev,
    boardid,
  } = req.body;

  let query = `UPDATE BOARD SET `;
  const values = [];

  if (open === "O" || open === "X") {
    query += `BRD_OPEN =? ,`;
    values.push(open);
  }

  query += `BRD_TITLE = ?, BRD_HASHTAG = ?, BRD_LOC_REV1 = ?, BRD_LOC_REV2 = ?, BRD_LOC_REV3 = ?, BRD_LOC_REV4 = ?, BRD_LOC_REV5 = ?, BRD_REV = ? WHERE BRD_ID = ?`;
  values.push(
    title,
    hashtag,
    loc1rev,
    loc2rev,
    loc3rev,
    loc4rev,
    loc5rev,
    boardrev,
    boardid
  );

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ updateboard: results, message: "수정 완료되었습니다." });
    }
  });
});

router.put("/updateopen", (req, res) => {
  const { boardId } = req.params;
  const { updatedIsOpen } = req.body.updatedIsOpen; //변경할 공개 여부 값 ('o' 또는

  const query = `SELECT LOC_POP_IMG
                FROM locationpop
                ORDER BY rand()
                LIMIT ?;`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.json.status(500).json({ error: "서버에러" });
    } else {
      res.json({ open: results });
    }
  });
});

router.post("/updateimages", (req, res) => {
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
