const express = require('express');
const db = require('../db'); //db연결
const bcrypt = require('bcrypt'); //암호화 관련 모듈

const router = express.Router();

router.post('/pullUserData', async(req, res)=> { //회원정보 수정할때 보여줄 데이터 가져다주기
    const email = req.body.email;

    db.query(`select USER_NICKNAME, USER_PHONE from weavewego.user where USER_EMAIL= ?;`, email, (err, results)=> {
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
                    'nick': results[0].USER_NICKNAME,
                    'phone': results[0].USER_PHONE
                })
            } else { //결과값이 없으면
                res.send({
                    'code':200,
                    'message':'사용가능한 닉네임입니다.'
                })
            }
        }
    })
})
//---------------------------회원정보 수정 쿼리------------------------------------
router.post('/updateProfile', async(req, res) => {
    const email = req.body.email;
    const nick = req.body.nick;
    const phone_num = req.body.phone;
    const pw = req.body.password;

    const encryptedpw = await bcrypt.hash(pw, 12);

    let query = `UPDATE weavewego.user SET`;
    let queryParams = [];

    if (nick) {
        query += ` USER_NICKNAME = ?,`;
        queryParams.push(nick);
    }

    if (phone_num) {
        query += ` USER_PHONE = ?,`;
        queryParams.push(phone_num);
    }

    if (encryptedpw) {
        query += ` USER_PW = ?,`;
        queryParams.push(encryptedpw);
    }

    query = query.slice(0, -1); // 마지막 쉼표 제거
    query += ` WHERE USER_EMAIL = ?`;
    queryParams.push(email);

    db.query(query, queryParams, (err, results) => {
        if (err) {
            res.send({
                'code': 400,
                'failed': 'error occurred',
                'error': err
            });
        } else {
            res.send({
                'code': 200,
                'message': '회원정보 수정 완료'
            });
        }
    });
});



module.exports = router;