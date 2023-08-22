const nodemailer = require('nodemailer');

const mailSender = {
    // 메일발송 함수
    sendGmail: function (param) {
      return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
          service: 'gmail',   // 메일 보내는 곳
          prot: 567,
          host: 'smtp.gmlail.com',  
          secure: true,  
          requireTLS: true ,
          auth: {
            user: "bj3757@gmail.com",  // 보내는 메일의 주소
            pass: "llyonxfwbtfhnmxi"   // 보내는 메일의 비밀번호
          }
        });
        // 메일 옵션
        var mailOptions = {
          from: "bj3757@gmail.com", // 보내는 메일의 주소
          to: param.toEmail, // 수신할 이메일
          subject: param.subject, // 메일 제목
          html: param.html, //메일 html 형식 이게 있으면 text는 보내지지 않음 
          //amp 가 `` 처럼 text와 html 형식 다 지원한다는데 굳이 써야할까? 
        };
        
        // 메일 발송    
        transporter.sendMail(mailOptions, (error, info)=> {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            console.log('Email sent: ' + info.response);
            resolve(info.response);
          }
        });
      })
  
    }
  }
  
  module.exports = mailSender;