var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser=bodyParser.urlencoded({extended:false});
var { resolve } = require('path')
var path = (filepath) => resolve(__dirname, filepath)


var db = require('./../util/db');
var db_sub = require('./../util/query').db_sub;
console.log(require("./../util/query"));


/*GET apply html*/
router.get('/apply', function(req, res) {
  res.sendFile(path("./../public/html/apply.html"));
});

/*apply submition**/

router.post('/sub',urlencodedParser,function(req,res,next){	
  db_sub(req, res, db);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path("./../public/html/index.html"));
});

module.exports = router;
