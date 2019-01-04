const dbname = require('./config')

if(dbname === "mysql"){
    var mysql = require("mysql")

    const DB = {
        host: 'localhost',
        user: 'root',
        password:'zn.980514',
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
    const DBConnection = mysql.createConnection({
        host:DB.host,
        user:DB.user,
        password:DB.password,
        database:DB.database,
        multipleStatements:true,
    
    });
    
    DBConnection.connect();
    
}
else{
    if(dbname === "sqlite3"){
        
    }
}

module.exports.DBConnection = DBConnection;

