//import express
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    let name = req.query.name;
    let password = req.query.password;
    console.log(name);
    console.log(password);
    //console.log("submit success!!");
});

//export
module.exports = router;