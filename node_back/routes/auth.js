const express = require('express');
const db = require('../db'); //db연결
const bcrypt = require('bcrypt'); //암호화 관련 모듈


const router = express.Router();



//----------------------회원가입 코드------------------------------
router.post('/join', async(req, res)=> { 
    const password = req.body.password; //bcrypt로 암호화
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
router.post('/checkemail', async(req, res)=> {
    const email = req.body.email; //확인하려는 이메일

    db.query('select * from weavewego.user where USER_EMAIL= ? ', email, (err, results)=> { //user테이블에 보내준 이메일을 select했을때 데이터가 있다면
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            if(results.length > 0) { //결과값이 있으면 //쿼리 실행결과는 배열로 나와서 length를 이용하여 데이터를 파악함
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
router.post('/checknick', async(req, res)=>{
    const nick = req.body.nickname;

    db.query('select * from weavewego.user where USER_NICKNAME=?', nick, (err, results)=> { //이메일이랑 비슷함..
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
//---------------로그인 처리-------------
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password; //받아오는 데이터
  
    db.query(`select * from weavewego.user where USER_EMAIL = ?`, email, async(error, results) => { //이메일이 존재하는지 확인
        if(error) {
            res.send({ //에러발생시
                'code': 400,
                'failed': 'error occurred',
                'error': error
            })
        } else {
            if(results.length > 0) { //이메일이 존재하면 비밀번호 bcrypt이용해서 확인
                const comparison = await bcrypt.compare(password, results[0].USER_PW) //bcrypt 이용하여 비교 //배열이라 [0]을 사용하여 해야함 [0]빼면 작동안함

                if(comparison) { //확인한게 성공이면? 데이터가 있다면?
                    res.send({
                        "code": 200,
                        "success": '로그인 성공',
                        "email" : results[0].USER_EMAIL, //쿼리 실행값에서 데이터 뽑기 유저 이메일,닉네임, 이미지 파일 vue단으로 보내기
                        "nick" : results[0].USER_NICKNAME,
                        'image' : results[0].USER_IMAGE, //프로필 사진을 얻기위해서는 유저 이메일과 테이블의 image가 필요하니까 보내줌
                        "provider" : results[0].USER_PROVIDER
                    });
                    
                } else { //비밀번호가 다르면
                    res.send({
                        'code' : 204,
                        'error' : '비밀번호 오류',
                        'message' : "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
                    })
                } 
            } else { //이메일이 존재하지않으면 //메시지를 통일하기로함
                res.send({
                    'code' : 206,
                    'error': '존재하지 않는 이메일',
                    'message' : "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
                });
            }
        }
    });
});
//-------비밀번호 확인---------
router.post('/checkPW', async(req, res)=>{
    const email = req.body.email;
    const pw = req.body.password;

    db.query(`select * from weavewego.user where USER_EMAIL = ?`, email, async(error, results) => { //이메일이 존재하는지 확인
        if(error) {
            res.send({ //에러발생시
                'code': 400,
                'failed': 'error occurred',
                'error': error
            })
        } else {
            if(results.length > 0) { //이메일이 존재하면 비밀번호 bcrypt이용해서 확인
                const comparison = await bcrypt.compare(pw, results[0].USER_PW) //bcrypt 이용하여 비교 //배열이라 [0]을 사용하여 해야함 [0]빼면 작동안함

                if(comparison) { //확인한게 성공이면? 데이터가 있다면?
                    res.send({
                        "code": 200
                    });
                    
                } else { //비밀번호가 다르면
                    res.send({
                        'code' : 204,
                        'error' : '비밀번호 오류',
                        'message' : "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
                    })
                } 
            } 
        }
    });
})
//-------카카오 로그인----------
router.post('/kakaologin', async(req, res)=> {
    let sex = '';

    if(req.body.sex === 'male') {
        sex = 'm'
    } else {
        sex= 'f'
    }

    const user = { //프론트에서 전달해주는 데이터
        'USER_EMAIL' : req.body.email,
        'USER_IMAGE' : req.body.image,
        'USER_SEX' : sex,
        'USER_AGEGROUP': req.body.agegroup,
        'USER_NICKNAME' : req.body.nick,
        'USER_PROVIDER' : req.body.provider,
        'USER_ADD' : req.body.add
    }

    db.query('insert into weavewego.user set ?', user, (err)=>{ //쿼리 실행
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
//카카오 로그인 후-----------------------------------
router.post('/kakaoData', async(req, res)=> {
    const email = req.body.email;

    db.query(`select * from weavewego.user where USER_EMAIL = ?`, email, async(err, results)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({
                email : results[0].USER_EMAIL,
                nick : results[0].USER_NICKNAME,
                image: results[0].USER_IMAGE,
                provider: results[0].USER_PROVIDER
            })
        }
    })
});
//------------네이버 로그인---------
router.post('/naverlogin', async(req, res)=> {
    let sex = '';

    if(req.body.sex === 'M') {
        sex = 'm'
    } else {
        sex= 'f'
    }

    const user = { //프론트에서 전달해주는 데이터
        'USER_EMAIL' : req.body.email,
        'USER_IMAGE' : req.body.image,
        'USER_SEX' : sex,
        'USER_AGEGROUP': req.body.agegroup,
        'USER_NICKNAME' : req.body.nick,
        'USER_PROVIDER' : req.body.provider,
    }

    db.query('insert into weavewego.user set ?', user, (err)=>{ //쿼리 실행
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
//네이버 로그인 후-------------------------------------
router.post('/naverData', async(req, res)=> {
    const email = req.body.email;

    db.query(`select * from weavewego.user where USER_EMAIL = ?`, email, async(err, results)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.send({
                email : results[0].USER_EMAIL,
                nick : results[0].USER_NICKNAME,
                image: results[0].USER_IMAGE,
                provider: results[0].USER_PROVIDER
            })
        }
    })
});
router.post('/defaultImage', async(req, res)=>{
    const email = req.body.email;

    db.query(`update weavewego.user set USER_IMAGE = 'default' where USER_EMAIL = ?`, email, async(err)=> {
        if(err) {
            res.send({ // 에러 발생 시
                'code':400,
                'failed': 'error occurred',
                'error': err
            })
        } else {
            res.status(200);
        } 
    })
})

module.exports = router;