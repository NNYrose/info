
const dbname = require("./config").dbname;
var exports = module.exports;
var bodyParser = require("body-parser");
var util = require("./util");
if(dbname === "mysql"){
    exports.db_sub=function(req, res, db){
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
    }
    exports.db_queryall = function (res, db) {
        var mysqlQuery='select * from info where is_auth = 0 and is_del = 0 ';
        db.DBConnection.query(mysqlQuery,function(err,result,fields){
         if(err){
           console.log(err);
           res.send({'error':err});
         }
         res.send(result);
       });
    };
    exports.db_auth = function (res, db, id){
        var mysqlQuery = 'UPDATE info SET is_auth=1 where id=' + id;
        db.DBConnection.query(mysqlQuery, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ 'error': err });
            }
            res.send(result);
            //res.redirect(res.location('./admain-log'));
        });
    };
    exports.db_del = function (res, db, id){
        var mysqlQuery = 'UPDATE info SET is_del=1 where id=' + id;
        db.DBConnection.query(mysqlQuery, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send({ 'error': err });
            }
            res.send(result);
            //res.redirect(res.location('./admain-log'));
        });
    };
}

if(dbname==="sqlite3"){
    exports.db_sub=function(req ,res, db){
        var mysqlParams=[
            util.nowDATE,
            req.body.name,		    
            req.body.tel,		    
            req.body.email,		    
            req.body.start_date,
            req.body.end_date,
            req.body.reason,
            0,
            0,

          ];
  var mysqlQuery='insert into info(apply_date,name,tel,email,start_date,end_date,reason, is_auth, is_del) values (?,?,?,?,?,?,?,?,?)';
  db.DBConnection.all(mysqlQuery,mysqlParams,function(err,rows,fields){
    if(err){
      res.send({"err":err});
    }
    var success={
      message: '增加成功'  
    };
    res.send(success);
  });
    };
    exports.db_queryall = function (req, res, db) {
        var mysqlQuery = 'select * from info where is_auth = 0 and is_del = 0 ';

        db.DBConnection.all(mysqlQuery, function (err, result, fields) {
            console.log(mysqlQuery + 'chaxub')
            if (err) {
                console.log(err);
                res.send({ 'error': err });
            }
            res.send(result);
        });
    }
        exports.db_auth = function (res, db, id) {

            var mysqlQuery = 'UPDATE info SET is_auth=1 where id=' + id;
            db.DBConnection.all(mysqlQuery, function (err, result, fields) {
                console.log(mysqlQuery);
                if (err) {
                    console.log(err);
                    res.send({ 'error': err });
                }
                res.send(result);
                //res.redirect(res.location('./admain-log'));
            });}
            exports.db_del = function (res, db, id) {
                var mysqlQuery = 'UPDATE info SET is_auth=1 where id=' + id;
                db.DBConnection.all(mysqlQuery, function (err, result, fields) {
                    console.log(mysqlQuery);
                    if (err) {
                        console.log(err);
                        res.send({ 'error': err });
                    }
                    res.send(result);
                    //res.redirect(res.location('./admain-log'));
                });
            }
        }


console.log(exports);