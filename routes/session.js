var express = require('express');
var router = express.Router();

var loginusers = {}
router.get('/*', function(req, res, next) {
    var session = res.getHeader("session");
    console.log(session);
    if(loginusers('admain') === session){
        next();
    }
    else{
        res.redirect('/admain');
    }

  });

module.exports.loginusers = loginusers;
module.exports.router = router;