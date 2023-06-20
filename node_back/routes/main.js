const express = require('express');
const db = require('../db'); //db연결

const router = express.Router();
//좋아요 수 상위 코스 4개 가져오기
router.post('/getBestCourse', async(req, res)=>{
    db.query('select BRD_ID, BRD_WRITER, BRD_HASHTAG, BRD_NICK, BRD_TITLE from weavewego.board join weavewego.likelist on board.BRD_ID = likelist.LL_NUM group by board.BRD_ID order by count(likelist.LL_ID) desc limit 4;', '', (err, results, fields)=>{
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            const titles = results.map(result => result.BRD_TITLE);
            const ids = results.map(result => result.BRD_ID);
            const nicks = results.map(result => result.BRD_NICK);
            const hashtags = results.map(result => result.BRD_HASHTAG);
            res.send({
                ids: ids,
                titles: titles,
                nicks: nicks,
                hashtags: hashtags
            })
        }
    })
})

module.exports = router;