const express = require('express');
const router = express.Router();
const db = require('../db');
const path = require('path');
const fs = require('fs');

//게시글 받아오기
router.get('/board', (req, res) => {
    const { boardId } = req.query;
    const query = `SELECT * FROM board WHERE BRD_ID=?`;

    db.query(query, [boardId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            const board = results[0];
            if (!board) {
                res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
            } else {
                if (board.BRD_OPEN) {
                    db.query(
                        'UPDATE board set BRD_VIEWCOUNT = BRD_VIEWCOUNT + 1 WHERE BRD_ID=?',
                        [boardId]
                    );
                    res.json({ board });
                } else {
                    const userId = req.user & req.user.id;
                    if (userId && userId === board.BRD.WRITER) {
                        res.json({ board });
                    } else {
                        res.status(403).json({ error: '비공개 게시글입니다.' });
                    }
                }
            }
        }
    });
});

//댓글 받아오기
router.get('/comments', (req, res) => {
    const { boardId } = req.query;
    const query = 'SELECT * FROM comment WHERE COM_NUM=?';

    db.query(query, [boardId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버에러' });
        } else {
            res.json({ comments: results });
        }
    });
});

//장소 받아오기
router.get('/locations', (req, res) => {
    const { boardId } = req.query;
    const query = `SELECT * FROM location WHERE LOC_ID=?`;

    db.query(query, [boardId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            res.json({ locations: results[0] });
        }
    });
});

//이미지 목록 받아오기
router.get('/images', (req, res) => {
    const { boardId } = req.query;
    const query = `SELECT * FROM image WHERE IMG_NUM=?`;

    db.query(query, [boardId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            res.json({ images: results });
        }
    });
});
//이미지 받아오기
router.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;

    fs.readFile(
        path.join(__dirname, `../CourseImage/${filename}`),
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: '이미지를 읽을 수 없습니다.' });
            } else {
                res.setHeader('Content-Type', 'image/jpeg');
                res.send(data);
            }
        }
    );
});

//팝업 운영시간
router.get('/locationpoptime', (req, res) => {
    const { boardId } = req.query;
    const query = `SELECT LOC_POP_TIME
                  FROM locationpop
                  ORDER BY rand()
                  LIMIT 1;`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            res.json({ locationpoptime: results });
        }
    });
});

//팝업 이미지 받아오기
router.get('/locationpopimages', (req, res) => {
    const { boardId } = req.query;
    const query = `SELECT LOC_POP_IMG
                FROM locationpop
                ORDER BY rand()
                LIMIT ?;`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.json.status(500).json({ error: '서버에러' });
        } else {
            res.json({ locationpopimages: results });
        }
    });
});

//게시글 신고 정보 받아오기
router.get('/report/board/:boardId', (req, res) => {
    const { boardId } = req.params;
    const query = `SELECT BRD_ID , BRD_REPORT, BRD_WRITER FROM board WHERE BRD_ID =19;`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버에러' });
        } else {
            if (results.length === 0) {
                //쿼리의 결과문이 없으면
                res.status(404).json({
                    error: '해당 게시글 신고를 찾을 수 없습니다.',
                });
            } else {
                const reportInfo = results[0];
                if (reportInfo.BRD_REPORT === 1) {
                    res.json({ reportInfo, isReported: true });
                } else {
                    res.json({ reportInfo, isReported: false });
                }
            }
        }
    });
});

//댓글 신고 정보 받아오기
router.get('/report/comment/:commentId', (req, res) => {
    const { commentId } = req.params;
    const query = `SELECT COM_ID , COM_REPORT, COM_WRITER FROM comment WHERE COM_ID=52;`;

    db.query(query, [commentId], (err, results) => {
        if (err) {
            res.status(500).json({ error: '서버 에러' });
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    error: ' 해당 댓글 신고 정보를 찾을 수 없습니다.',
                });
            } else {
                const reportInfo = results[0];
                if (reportInfo.COM_REPORT === 1) {
                    res.json({ reportInfo, isReported: true });
                } else {
                    res.json({ reportInfo, isReported: false });
                }
            }
        }
    });
});

//게시글 신고 당함
router.put('/updateReport/board/:boardId', (req, res) => {
    const { boardId } = req.params;

    const updateReport = `UPDATE board SET BRD_REPORT =1 WHERE BRD_ID=3;`;

    db.query(updateReport, [boardId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: '해당 게시글을 찾을 수 없습니다.',
                });
            } else {
                res.json({
                    message: '게시글이 정상적으로 신고 처리되었습니다.',
                });
            }
        }
    });
});

//댓글 신고당함
router.put('/updateReport/comment/:commentId', (req, res) => {
    const { commentId } = req.params;

    const updateReport = `UPDATE comment SET COM_REPORT =1 WHERE COM_ID=52;`;

    db.query(updateReport, [commentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버 에러' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({
                    error: '해당 댓글을 찾을 수 없습니다.',
                });
            } else {
                res.json({ message: '댓글이 정상적으로 신고 처리되었습니다.' });
            }
        }
    });
});

//게시글 삭제
router.get('/deleteboard', (req, res) => {
    const { boardId } = req.query;
    const query = `DELETE FROM board where BRD_ID=?`;

    db.query(query, [boardId], (err, results) => {
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
    db.query(query, [commentId], (err, results) => {
        if (err) {
            console.error(err);
            res.json.status(500).json({ error: "서버에러" });
        } else {
            res.json({ deletecomment: results });
        }
    });
});

//댓글 수정

router.put('/updatecomments/', (req, res) => {
    const { commentId } = req.params;
    const updatedComment = req.body.updatedComment;

    const query = `update comment 
                set COM_COMMENT = ?, COM_CREATED_AT = NOW() 
                where COM_ID = ?`;
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: '서버에러' });
        } else {
            if (!updatedComment) {
                res.status(400).json({ message: '댓글을 입력하세요.' });
            } else {
                res.status(200).json({
                    updatecomments: results,
                    message: '댓글이 수정되었습니다.',
                });
            }
        }
    });
});

//게시글 내용 수정--------------------------------------------------------
router.put('/updateboard', (req, res) => {
    console.log(req.body);
    const postData = req.body.postData;
    const locationData = req.body.locationData;
    const boardRow = {
        BRD_TITLE: postData.title,
        BRD_LOC_REV1: locationData[0] ? locationData[0].content : '',
        BRD_LOC_REV2: locationData[1] ? locationData[1].content : '',
        BRD_LOC_REV3: locationData[2] ? locationData[2].content : '',
        BRD_LOC_REV4: locationData[3] ? locationData[3].content : '',
        BRD_LOC_REV5: locationData[4] ? locationData[4].content : '',
        BRD_REV: postData.review,
        BRD_HASHTAG: postData.hashtag,
        BRD_OPEN: postData.open,
    };

    const query = `UPDATE BOARD SET BRD_TITLE = ?, BRD_HASHTAG = ?, BRD_LOC_REV1 = ?, BRD_LOC_REV2 = ?, BRD_LOC_REV3 = ?, BRD_LOC_REV4 = ?, BRD_LOC_REV5 = ?, BRD_REV = ?,BRD_CREATED_AT=NOW(),BRD_OPEN =? WHERE BRD_ID = ?;`;

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
        isOpen,
        boardId,
    ];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "서버에러" });
        } else {
            res.status(200).json({
                updateboard: results,
                message: "게시글 수정이 완료되었습니다.",
            });
        }
    });
});

module.exports = router;
