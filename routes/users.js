var express = require('express');
var router = express.Router();

var bodyParser = require("body-parser");
var util = require('./../util/util');
var db = require("./../util/db");

var urlencodedParser=bodyParser.urlencoded({extended:false});

var { resolve } = require('path');
var path = (filepath) => resolve(__dirname, filepath);
var db_queryall = require("./../util/query").db_queryall;
var db_auth = require("./../util/query").db_auth;
var db_del = require("./../util/query").db_del;

var loginusers = require("./session").loginusers;
// var loginusers = [];
/**
 * 
 * 
 * TODO: admain 权限验证
 * 
 * 
 * 
 */

/* GET users listing. */


// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');

// });
router.get('/admain', function(req, res, next){
  res.sendFile(path("./../public/html/admain.html"))
})



router.post('/admain-log', urlencodedParser, function(req, res, next){
  var admain = req.body.admain
  var password = req.body.password
  console.log('username is ' + admain + 'passwoed is ' + password);
  if (admain == 'admain' && password == "123456"){
    var session = Math.random().toString(36).substr(2);
    console.log('login user ' + session);
    loginusers['admain'] = session;
    console.log('login user ' + loginusers['admain']);
    
    res.redirect("./query_index");
  }
  else
    res.redirect("./admain");
})

router.get('/*', function(req, res, next) {
  var session = loginusers['admain'];
  if(!session) res.redirect('./admain');
  if(loginusers['admain'] === session){
      next();
  }
  else{
      console.log('logn in failed')
      res.redirect('./admain');
  }

  
});

// router.get('/admain', function(req, res, next){
//   res.sendFile(path("./../public/html/admain.html"))
// })

router.get('/query_index', function(req, res, next){
  res.sendFile(path("./../public/html/query.html"));
})



// router.post('/admain-log', urlencodedParser, function(req, res, next){
//   var admain = req.body.admain
//   var password = req.body.password
//   console.log('username is ' + admain + 'passwoed is ' + password);
//   if (admain == 'admain' && password == "123456"){
//     var session = Math.random().toString(36).substr(2);
//     loginusers['admain'] = session;
//     res.redirect("./query_index");
//   }
//   else
//     res.redirect("./admain");
// })



/**
 * admain 管理界面
 */

router.get('/query',function(req, res, next){
   db_queryall(req, res, db);
})

router.post('/auth', function (req, res, next) {
  var id = req.body['id'];
  var auth = req.body['auth'];
  if (auth == 1) {
    db_auth(res, db, id);
  }
  else
    if (auth == 0) {
      db_del(res, db, id);
    }
    else {
      res.send("操作失败");
  }
})

module.exports = router;