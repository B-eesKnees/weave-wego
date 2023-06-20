const express = require('express');
const db = require('../db'); //db연결
const bcrypt = require('bcrypt'); //암호화 관련 모듈

const router = express.Router();

//----------------------회원가입 코드------------------------------
router.post('/join', async(req, res)=> {
    const password = req.body.password; //암호화
    const bcryptPassword = await bcrypt.hash(password, 12);
    

    const user = { //프론트에서 전달해주는 데이터
        'USER_EMAIL' : req.body.email,
        'USER_PW' : bcryptPassword, //암호화한 비밀번호
        'USER_SEX' : req.body.sex,
        'USER_AGEGROUP': req.body.agegroup,
        'USER_NICKNAME' : req.body.nickname,
        'USER_PHONE': req.body.phone_num,
        'USER_ADD' : req.body.add
    }

    db.query('insert into weavewego.user set ?', user, (err, results, fields)=>{ //쿼리 실행
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({ //쿼리 실행 성공시
                'code':200,
                'message': '회원가입 성공'
            })
        }
    })
});
//-----------------이메일 중복 확인--------------------------
router.post('/checkEmail', async(req, res)=> {
    const email = req.body.email; //확인하려는 이메일

    db.query('select * from weavewego.user where USER_EMAIL= ? ', email, (err, results, fields)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            if(results.length > 0) { //결과값이 있으면
                res.send({
                    'code':200,
                    'message': '존재하는 이메일입니다.'
                })
            } else { //결과값이 없으면
                res.send({
                    'code':200,
                    'message':'사용가능한 이메일입니다.'
                })
            }
        }
    })
});
//-----------------닉네임 중복 확인--------------------------
router.post('/checkNick', async(req, res)=>{
    const nick = req.body.nickname;

    db.query('select * from weavewego.user where USER_NICKNAME=?', nick, (err, results, fields)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            if(results.length > 0) { //결과값이 있으면
                res.send({
                    'code':200,
                    'message': '존재하는 닉네임입니다.'
                })
            } else { //결과값이 없으면
                res.send({
                    'code':200,
                    'message':'사용가능한 닉네임입니다.'
                })
            }
        }
    
    })
});


module.exports = router;