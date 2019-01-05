const dbname = require('./../config').dbname;
var path = require("path");
if(dbname === "mysql"){
    var mysql = require("mysql")

    const DB = {
        host: 'localhost',
        user: 'users',
        password:'password',
        database: 'info',
    };
    /**
     * 提交时间
     * 姓名
     * 联系电话
     * 邮箱
     * ------
     * 开始日期
     * 截止日期
     * 原因
     * ----
     * 审批意见
     * 是否同意
     * 
     * ----
     * 删除
     * 
            审批意见
            是否同意
            删除
     * 
     * SELECT `info`.`id`,
        `info`.`name`,
        `info`.`tel`,
        `info`.`email`,
        `info`.`start_date`,
        `info`.`end_date`,
        `info`.`reason`,
        `info`.`advice`,
        `info`.`is_auth`,
        `info`.`is_del`
    FROM `info`.`info`;
    
     * 
     */
    const db = mysql.createConnection({
        host:DB.host,
        user:DB.user,
        password:DB.password,
        database:DB.database,
        multipleStatements:true,
    
    });
    
    db.connect();
    console.log('mysql complete');
    
}
else{
    if(dbname === "sqlite3"){
var fs = require('fs');
var path = require('path');
var file =path.join(__dirname, './test.db');

var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database(file,sqlite3.OPEN_READWRITE);
console.log(exists+ "hhhhhhh");
if(exists){
  var db = new sqlite3.Database(file,sqlite3.OPEN_READWRITE); 
  console.log("open right");
}
else {
    var db = new sqlite3.Database(file);
    db.serialize(function () {
        db.run("CREATE TABLE `info` ( \
    `id` INTEGER PRIMARY KEY   AUTOINCREMENT , \
    `apply_date` date DEFAULT NULL, \
    `name` varchar(45) DEFAULT NULL, \
    `tel` varchar(16) DEFAULT NULL, \
    `email` varchar(64) DEFAULT NULL, \
    `start_date` datetime DEFAULT NULL, \
    `end_date` datetime DEFAULT NULL, \
    `reason` text, \
    `advice` varchar(64) DEFAULT NULL, \
    `is_auth` int DEFAULT 0, \
    `is_del` int DEFAULT 0 );" );
        console.log("init");
    });
}
console.log('sqlite3 complete');    
}
console.log(dbname);
}

//export DBConnection
module.exports.DBConnection = db;

