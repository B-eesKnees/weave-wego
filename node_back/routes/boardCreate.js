const express = require('express');
const db = require('../db'); //db연결

const router = express.Router();

router.post('/', async(req, res)=> {
    const course = {
        BRD_WRITER: req.body.writer,
        BRD_TITLE: req.body.title,
        BRD_LOC_REV1 : req.body.loc_rev1,
        BRD_LOC_REV2 : req.body.loc_rev2,
        BRD_LOC_REV3 : req.body.loc_rev3,
        BRD_LOC_REV4 : req.body.loc_rev4,
        BRD_LOC_REV5 : req.body.loc_rev5,
        BRD_REV : req.body.rev,
        BRD_HASHTAG : req.body.hashtag,
        BRD_NICK : req.body.nick,
        BRD_OPEN: req.body.open
    }

    db.query(`insert into weavewego.board set ?`, course, (err)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            }) 
        } else {
            res.send({ //쿼리 실행 성공시
                'code':200,
                'message': '글 작성 성공'
            })
        }
    })
});

module.exports = router;