var express = require('express');
var db = require('./../db');
var router = express.Router();
var bodyParser = require("body-parser");
var util = require('./../util')
var urlencodedParser=bodyParser.urlencoded({extended:false});
var { resolve } = require('path')

var path = (filepath) => resolve(__dirname, filepath)


/*GET user html*/
router.get('/apply', function(req, res) {

  res.sendFile(path("./../public/html/apply.html"));

});

/***/
router.post('/sub',urlencodedParser,function(req,res,next){	
  
  var mysqlParams=[
            util.nowDATE,
            req.body.name,		    
            req.body.tel,		    
            req.body.email,		    
            req.body.start_date,
            req.body.end_date,
            req.body.reason,
          ];
  var mysqlQuery='insert into info(apply_date,name,tel,email,start_date,end_date,reason) values (?,?,?,?,?,?,?)';
  db.DBConnection.query(mysqlQuery,mysqlParams,function(err,rows,fields){
    if(err){
      res.send({"err":err});
    }
    var success={
      message: '增加成功'  
    };
    res.send(success);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile();
});

module.exports = router;
