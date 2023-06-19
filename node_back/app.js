const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const morgan = require('morgan');

const session = require('express-session');
const fs = require('fs');
const morgan = require('morgan');

app.use(session({
    secret: 'secret code', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60
    }
}));



app.set('port', process.env.PORT || 3000); //포트 3000번으로 설정

const db = { //디비연결
    database: 'weavewego', //
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '12345678'
};
const dbPool = require('mysql').createPool(db);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 대기중');
});