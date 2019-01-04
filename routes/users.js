var express = require('express');
var router = express.Router();
var db = require('./../db');
var bodyParser = require("body-parser");
var util = require('./../util')

var urlencodedParser=bodyParser.urlencoded({extended:false});

var { resolve } = require('path')
var path = (filepath) => resolve(__dirname, filepath)
/**
 * 
 * 
 * TODO: admain 权限验证
 * 
 * 
 * 
 */

/* GET users listing. */
router.get('/', function(req, res, next) {
   //console.log('======================'+ util.nowDATE);
   console.log('======================'+ util.nowDATE);
  res.send('respond with a resource');

});

router.get('/admain', function(req, res, next){
  res.sendFile(path("./../public/html/admain.html"))
})

router.post('/admain-log', urlencodedParser, function(req, res, next){
  var admain = req.body.admain
  var password = req.body.password
  console.log('username is ' + admain + 'passwoed is ' + password);
  if (admain == 'admain' && password == "123456"){
    // var success={
    //   message: '登录成功'  
    // };
    res.sendFile(path("./../public/html/query.html"))
  }
  else
    res.send({'message': 'password error'});
})
module.exports = router;


/**
 * admain 管理界面
 */

 router.get('/query', function(req, res, next){
   var mysqlQuery='select * from info where is_auth = 0 and is_del = 0 ';
   db.DBConnection.query(mysqlQuery,function(err,result,fields){
    if(err){
      console.log(err);
      res.send({'error':err});
    }
    res.send(result);
  });
})

router.post('/auth', function (req, res, next) {
  var id = req.body['id'];
  var auth = req.body['auth'];
  if (auth == 1) {
    var mysqlQuery = 'UPDATE info SET is_auth=1 where id=' + id;
    db.DBConnection.query(mysqlQuery, function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send({ 'error': err });
      }
      res.send(result);
      //res.redirect(res.location('./admain-log'));
    });
  }
  else
    if (auth == 0) {
      var mysqlQuery = 'UPDATE info SET is_del=1 where id=' + id;
      db.DBConnection.query(mysqlQuery, function (err, result, fields) {
        if (err) {
          console.log(err);
          res.send({ 'error': err });
        }
      res.send(result);
      //res.redirect(res.location('./admain-log'));
      });
    }
    else {
      res.send("操作失败");
    }
})