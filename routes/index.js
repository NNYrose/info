var express = require('express');
var db = require('./../db');
var router = express.Router();
var bodyParser = require("body-parser");
var util = require('./../util')
var urlencodedParser=bodyParser.urlencoded({extended:false});
var { resolve } = require('path')
var db = require('./../db');
var path = (filepath) => resolve(__dirname, filepath)
var db_sub = require('./../query').db_sub;
console.log(require("./../query"));


/*GET user html*/
router.get('/apply', function(req, res) {
  console.log(path("./../public/html/apply.html"));
  res.sendFile(path("./../public/html/apply.html"));

});

/***/
router.post('/sub',urlencodedParser,function(req,res,next){	
  db_sub(req, res, db);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(path("./../public/html/apply.html"));
  res.sendFile(path("./../public/html/index.html"));
});

module.exports = router;
