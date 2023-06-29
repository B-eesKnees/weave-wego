const express = require('express');
const db = require('../db'); //db연결

const router = express.Router();
//-----------------------------------신고된 게시글 보기
router.post('/reportCourse', async(req, res)=>{

    db.query(`select * from weavewego.board where BRD_REPORT = 1`, (err, results)=>{ //report가 1이면 출력시키는 쿼리
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send(
                results //배열 형식으로 보내줌
            )
        }
    })
});
//-----------------------------------신고된 댓글 보기
router.post('/reportComment', async(req, res)=> {
    
    db.query(`select * from weavewego.comment where COM_REPORT = 1`, (err, results)=>{
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send(
                results //배열 형식으로 보내줌
            )
        }
    })
});
//----------------------------------신고된 게시글 삭제 여러개 한번에 지우기?
router.post('/deleteCourse', async(req, res)=>{
    const deleteCourses = req.body.CourseID; //ex) [1,2,3] 형식으로 날라오면

    deleteCourses.forEach(CourseID=>{ //반복문 실행
        db.query(`delete from weavewego.board where BRD_ID = ?`, CourseID, (err)=>{ //쿼리문 반복 실행
            if(err) {
                res.send({ // 에러 발생 시
                    'code':400,
                    'failed': 'error occurred',
                    'error': err
                }) 
            }
        });
    });

    res.send({
        "message" : "삭제 성공"
    })
})

module.exports = router;