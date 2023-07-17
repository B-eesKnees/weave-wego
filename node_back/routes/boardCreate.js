const express = require("express");
const db = require("../db"); //db연결
const router = express.Router();
//
const path = require("path");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    filename(req, file, done) {
      // 업로드 될 파일 이름은 유저가 보내준 그대로 사용하면
      // 이름이 같지만 이미지가 다른 파일 업로드 시 문제가 될 수 있어요
      // 그래서 업로드 시간을 사용해 이름을 만들게요
      done(
        null,
        `${Date.now()}_${Math.round(Math.random() * 1e9)}.${
          file.mimetype.split("/")[1]
        }`
      );
    },
    destination(req, file, done) {
      done(null, path.join(__dirname, "../CourseImage"));
    },
  }),
});
const postUpload = upload.fields([
  { name: "postData" },
  { name: "locationData" },
  { name: "imageData" },
]);

router.post("/", postUpload, (req, res) => {
  // Step 1. 프론트에서 게시글, 장소들, 이미지 데이터를 받을게요
  const postData = JSON.parse(req.body.postData);
  const locationData = JSON.parse(req.body.locationData);
  // Step 2. DB의 board 테이블에 맞게 데이터를 가공할게요
  const boardRow = {
    // ID는 INSERT 할 때 결정됩니다.
    BRD_WRITER: postData.writer,
    BRD_TITLE: postData.title,
    BRD_LOC_REV1: locationData[0] ? locationData[0].content : "", // 이것들은
    BRD_LOC_REV2: locationData[1] ? locationData[1].content : "", // 장소 정보에서
    BRD_LOC_REV3: locationData[2] ? locationData[2].content : "", // 뽑을게요
    BRD_LOC_REV4: locationData[3] ? locationData[3].content : "", // 삼항연산자는
    BRD_LOC_REV5: locationData[4] ? locationData[4].content : "", // 장소가 무조건 5개가 아니기에
    // 비어있을 가능성이 있어서 런타임 에러 방지를 위해 사용했어요
    BRD_REV: postData.review,
    BRD_HASHTAG: JSON.stringify(postData.hashtag),
    // Created, Updated는 front의 정보를 받아오면 위험해요
    // Front의 요청은 악의적으로 변조될 수 있으니
    // 백 혹은 DB에서 정해주는 것이 좋아요
    BRD_OPEN: postData.open,
    BRD_REPORT: 0, // defalt가 0 이겠네요
    BRD_NICK: postData.nick,
    BRD_VIEWCOUNT: 0, // default가 0이겠네요
  };
  // Step 3. board 테이블에 데이터를 INSERT
  // 서브 쿼리를 활용해 ID를 명시적으로 지정할게요
  db.query(
    "INSERT INTO board SET `BRD_ID` = (SELECT IFNULL(MAX(BRD_ID) + 1, 1) FROM board b), ? ",
    boardRow,
    (err, results) => {
      if (err) {
        console.error(err); // 오류처리 하세용
        res.status(500).json({ message: "DB ERROR" });
      } else {
        // Step 4. 방금 삽입한 Row의 ID는 results 객체 안에 있어요.
        const postId = results.insertId;
        // Step 5. location 테이블에 넣을 데이터를 가공할게요
        // location 테이블의 컬럼이 json 형태를 요구하니 그에 맞춰줄게요
        // json 자료형은 필요할때만 지정하세요 ^^
        const locationRow = {
          LOC_ID: postId, // 방금 받아온 새 글의 ID
          LOC_NAME: JSON.stringify(
            locationData.map((l) => ({ name: l.title }))
          ), // locationData 중 이름만 추출
          LOC_ADD: JSON.stringify(
            locationData.map((l) => ({ add: l.address }))
          ), // locationData 중 주소만 추출
          LOC_LAT: JSON.stringify(
            locationData.map((l) => ({ lat: l.coord.Ma }))
          ), // locationData 중 latitude만 추출
          LOC_LNG: JSON.stringify(
            locationData.map((l) => ({ lng: l.coord.La }))
          ), // locationData 중 longitude만 추출
        };
        // Step 6. 다음 Locations Insert를 진행합니다.
        db.query("INSERT INTO location SET ?", locationRow, (err) => {
          if (err) {
            console.error(err); // 오류처리 하세용
            res.status(500).json({ message: "DB ERROR" });
          } else {
            // Step 7. 이미지 저장
            // 이미지 파일 정보는 req.files.imageData 여기에 담겨있어요
            // Multer에 의해 이미 업로드는 된 상태입니다
            // CourseImage/imageData_업로드타임스템프.확장자
            // DB에 저장만 해줄게요
            const imageRow = req.files.imageData.map((f) => [
              postId, // 게시글 ID - IMG_NUM
              f.filename, // 파일 경로 - IMG_PATH
            ]);
            db.query(
              "INSERT INTO image (IMG_NUM, IMG_PATH) VALUES ?",
              [imageRow], // 이 방법으로 다중 INSERT 가능
              (err) => {
                if (err) {
                  console.error(err); // 오류처리 하세용
                  res.status(500).json({
                    message: "DB ERROR",
                  });
                } else {
                  res.status(200).json({
                    message: "INSERT COMPLETE",
                    boardId: postId,
                  });
                }
              }
            );
          }
        });
      }
    }
  );
});

router.put("/update", postUpload, (req, res) => {
  const postData = JSON.parse(req.body.postData);
  const locationData = JSON.parse(req.body.locationData);
  const deletedImagesData = JSON.parse(req.body.deletedImages).length
    ? JSON.parse(req.body.deletedImages)
    : [0];
  const postId = postData.id;
  const boardRow = {
    BRD_TITLE: postData.title,
    BRD_LOC_REV1: locationData[0] ? locationData[0].content : "", // 이것들은
    BRD_LOC_REV2: locationData[1] ? locationData[1].content : "", // 장소 정보에서
    BRD_LOC_REV3: locationData[2] ? locationData[2].content : "", // 뽑을게요
    BRD_LOC_REV4: locationData[3] ? locationData[3].content : "", // 삼항연산자는
    BRD_LOC_REV5: locationData[4] ? locationData[4].content : "", // 장소가 무조건 5개가 아니기에
    BRD_REV: postData.review,
    BRD_HASHTAG: JSON.stringify(postData.hashtag),
    BRD_OPEN: postData.open,
  };
  db.query("UPDATE board SET ? WHERE BRD_ID=?", [boardRow, postId], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "DB ERROR" });
    } else {
      const locationRow = {
        LOC_NAME: JSON.stringify(locationData.map((l) => ({ name: l.title }))),
        LOC_ADD: JSON.stringify(locationData.map((l) => ({ add: l.address }))),
        LOC_LAT: JSON.stringify(locationData.map((l) => ({ lat: l.coord.Ma }))),
        LOC_LNG: JSON.stringify(locationData.map((l) => ({ lng: l.coord.La }))),
      };

      db.query(
        "UPDATE location SET ? WHERE LOC_ID=?",
        [locationRow, postId],
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "DB ERROR" });
          } else {
            db.query(
              "DELETE FROM image WHERE IMG_ID IN (?)",
              [deletedImagesData],
              (err) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({
                    message: "DB ERROR",
                  });
                } else {
                  if (req.files.imageData) {
                    const imageRow = req.files.imageData.map((f) => [
                      postId,
                      f.filename,
                    ]);
                    db.query(
                      "INSERT INTO image (IMG_NUM, IMG_PATH) VALUES ?",
                      [imageRow],
                      (err) => {
                        if (err) {
                          console.error(err);
                          res.status(500).json({
                            message: "DB ERROR",
                          });
                        } else {
                          res.status(200).json({
                            message: "INSERT COMPLETE",
                            boardId: postId,
                          });
                        }
                      }
                    );
                  } else {
                    res.status(200).json({
                      message: "INSERT COMPLETE",
                      boardId: postId,
                    });
                  }
                }
              }
            );
          }
        }
      );
    }
  });
});

router.post("/comment", (req, res) => {
  const body = req.body;
  const commentRow = {
    COM_NUM: body.boardId,
    COM_WRITER: body.writer,
    COM_NICK: body.nick,
    COM_IMAGE: body.image,
    COM_COMMENT: body.comment,
  };
  db.query("INSERT INTO comment SET ? ", commentRow, (err) => {
    if (err) {
      console.error(err); // 오류처리 하세용
      res.status(500).json({ message: "DB ERROR" });
    } else {
      res.status(200).json({
        message: "INSERT COMPLETE",
      });
    }
  });
});

module.exports = router;
