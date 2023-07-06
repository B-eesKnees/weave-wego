const express = require("express");
const db = require("../db"); //db연결

const router = express.Router();

router.post("/", (req, res) => {
  // Step 1. 프론트에서 게시글, 장소들, 이미지 데이터를 받을게요
  const { postData, locationData, imageData } = req.body;
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
    BRD_HASHTAG: postData.hashtag,
    // Created, Updated는 front의 정보를 받아오면 위험해요
    // Front의 요청은 악의적으로 변조될 수 있으니
    // 백 혹은 DB에서 정해주는 것이 좋아요
    BRD_OPEN: postData.open,
    BRD_REPORT: "0", // defalt가 X겠네요
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
            locationData.map((l) => ({ name: l.address }))
          ), // locationData 중 주소만 추출
          LOC_LAT: JSON.stringify(
            locationData.map((l) => ({ name: l.coord.La }))
          ), // locationData 중 latitude만 추출
          LOC_LNG: JSON.stringify(
            locationData.map((l) => ({ name: l.coord.Ma }))
          ), // locationData 중 longitude만 추출
        };
        // Step 6. 다음 Locations Insert를 진행합니다.
        db.query("INSERT INTO location SET ?", locationRow, (err, results) => {
          if (err) {
            console.error(err); // 오류처리 하세용
            res.status(500).json({ message: "DB ERROR" });
          } else {
            // Step 7. 이미지 업로드 작성 구역
            // 조금만 기다려주세용~
            res.status(200).json({
              message: "INSERT COMPLETE",
            });
          }
        });
      }
    }
  );
});

module.exports = router;
