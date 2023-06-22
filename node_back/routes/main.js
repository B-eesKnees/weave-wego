const express = require('express');
const db = require('../db'); //db연결

const router = express.Router();
//좋아요 수 상위 코스 4개 가져오기
router.post('/getBestCourse', async(req, res)=>{
    db.query(`SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, (SELECT IMG_PATH FROM weavewego.image 
            WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as 좋아요수
            FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
            GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE` 
            , (err, results, fields)=>{
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({
                results
            })
        }
    })
});
//좋아요 관련 쿼리???
router.post('/likeCourse', async(req, res)=> {
    const LL_ID = req.body.email;
    const LL_NUM = req.body.brdID;

    const like = {
        LL_ID,
        LL_NUM
    }
    db.query(`insert into weavewego.likelist set ?`, like, (err, results)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({
                'code':200,
                'message' : '좋아요.'
            })
        }
    })
});
//좋아요 취소 쿼리?
router.post('/dislikeCoures', async(req, res)=> {
    const LL_ID = req.body.email;
    const LL_NUM = req.body.brdID;
    

    db.query(`delete from weavewego.likelist where LL_ID = ? AND LL_NUM = ?`, [LL_ID, LL_NUM], (err)=> {
        if(err) {
            res.send({
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({
                'code':200,
                'message' : '이제 싫어요.'
            })
        }
    })
});
//조회수 늘어나는 쿼리?
router.post('/increase', async(req, res)=> {
    const brdID = req.body.brd_id;

    db.query(`UPDATE weavewego.board
            SET BRD_VIEWCOUNT = BRD_VIEWCOUNT + 1
            WHERE BRD_ID = ?;`, brdID, (err)=> {
                if(err) {
                    res.send({
                        'code':400,
                        'failed': 'error occurred',
                        'error': err 
                    })
                } else {
                    res.send({
                        'code': 200
                    })
                }
            })
});

module.exports = router;