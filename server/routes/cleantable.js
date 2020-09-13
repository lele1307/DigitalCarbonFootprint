//import express
const express = require('express');
const router = express.Router();
// use database
const sql = require('sqlite3');
const db = new sql.Database('serverData.db');

router.get('/', function(req, res, next) {
  console.log(req.query);
  const delQuery = `Delete from ${req.query.tableName}`;
  console.log(delQuery);
  db.run(delQuery,function(){
    res.send(`clean ${req.query.tableName} table success!`);
  })
});

module.exports = router;