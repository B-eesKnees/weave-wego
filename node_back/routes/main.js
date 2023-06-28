const express = require('express');
const db = require('../db'); //db연결

const router = express.Router();
//좋아요 수 순서대로 가져오기
router.post('/getLikeCourse', async(req, res)=>{
    db.query(`SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, board.BRD_CREATED_AT, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by likecount desc;` 
            , (err, results)=>{
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
//조회수 순대로 가져오기
router.post('/getViewsCourse', async(req, res)=>{
    db.query(`SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, board.BRD_CREATED_AT, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_VIEWCOUNT desc;` 
            , (err, results)=>{
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
//최신순으로 가져오기
router.post('/getNewestCourse', async(req, res)=>{
    db.query(`SELECT board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE, board.BRD_CREATED_AT, board.BRD_VIEWCOUNT, (SELECT IMG_PATH FROM weavewego.image 
                WHERE weavewego.image.IMG_NUM = weavewego.board.BRD_ID LIMIT 1) AS IMG_PATH, COUNT(likelist.LL_ID) as likecount
                FROM weavewego.board left JOIN weavewego.likelist ON board.BRD_ID = likelist.LL_NUM 
                GROUP BY board.BRD_ID, board.BRD_WRITER, board.BRD_HASHTAG, board.BRD_NICK, board.BRD_TITLE
                order by board.BRD_CREATED_AT ASC;` 
            , (err, results)=>{
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
    db.query(`insert into weavewego.likelist set ?`, like, (err)=> {
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