//import express
const express = require('express');
const router = express.Router();
// use database
const sql = require('sqlite3');
const db = new sql.Database('serverData.db');

router.get('/', function(req, res, next) {
    if (req.query.tableName=='gameresult') {
        let InsertQuery = `insert into ${req.query.tableName} VALUES (?, ?, ?, ?, ?, ?, ?)`;
        let preInsertQuery = db.prepare(InsertQuery);
        let inputGamename = req.query.gamename;
        console.log(inputGamename);
        let inputId = parseInt(req.query.id);
        let inputActivity = req.query.activity;
        let inputTraffic = parseFloat(req.query.traffic);
        let inputDevice = req.query.device;
        let inputWh = parseFloat(req.query.wh);
        let inputTime = parseInt(req.query.time); 
        runInsertGame(preInsertQuery,inputId,inputActivity,inputGamename,inputTraffic,inputDevice,inputWh,inputTime,function() {
            res.send("insert success!");
        })
    } else if(req.query.tableName=='home'){
        let InsertQuery = `insert into ${req.query.tableName} VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
        let preInsertQuery = db.prepare(InsertQuery);
        let inputName = req.query.name;
        let inputAge = parseInt(req.query.age);
        let inputTime = parseInt(req.query.time);
        let inputSelectRegion = req.query.selectRegion;
        let inputSelectCountry = req.query.selectCountry;
        let production_fuel = parseFloat(req.query.production_fuel);
        let inputSelectCPE = req.query.selectCPE;
        let timestamp = req.query.id;
        runHome(preInsertQuery,inputName,inputAge,inputTime,inputSelectRegion,inputSelectCountry,production_fuel,inputSelectCPE,timestamp,function() {
            res.send("home insert success!");
        })
    } else {
        let InsertQuery = `insert into ${req.query.tableName} VALUES (?, ?, ?, ?, ?, ?)`;
        let preInsertQuery = db.prepare(InsertQuery);
        let inputId = parseInt(req.query.id);
        let inputActivity = req.query.activity;
        let inputTraffic = parseFloat(req.query.traffic);
        let inputDevice = req.query.device;
        let inputWh = parseInt(req.query.wh);
        let inputTime = parseInt(req.query.time); 
        runInsert(preInsertQuery,inputId,inputActivity,inputTraffic,inputDevice,inputWh,inputTime,function() {
            res.send("insert success!");
        })
    }
});

function runInsert(preQuery,inputId,inputActivity,inputTraffic,inputDevice,inputWh,inputTime,callback) {
    preQuery.run(inputId,inputActivity,inputTraffic,inputDevice,inputWh,inputTime);
    callback();
}

function runHome(preQuery,inputName,inputAge,inputTime,inputSelectRegion,inputSelectCountry,production_fuel,inputSelectCPE,timestamp,callback) {
    preQuery.run(inputName,inputAge,inputTime,inputSelectRegion,inputSelectCountry,production_fuel,inputSelectCPE,timestamp);
    callback();
}

function runInsertGame(preQuery,inputId,inputActivity,inputGamename,inputTraffic,inputDevice,inputWh,inputTime,callback) {
    preQuery.run(inputId,inputActivity,inputGamename,inputTraffic,inputDevice,inputWh,inputTime);
    callback();
}
module.exports = router;