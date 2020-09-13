const express = require('express');
const router = express.Router();

//import database
const sql = require('sqlite3');
const db = new sql.Database("serverData.db");
let result;

router.get('/', function (req, res, next) {
  const tableName = req.query.tableName;
    let baseQuery =  `select * from ${tableName}`;
    console.log(baseQuery);
    let ps = db.prepare(baseQuery);
    getSaved(ps,function(){
      res.send(result);
    });
})

const getSaved = function (preQuery,callback) {
    preQuery.all(function (error, final) {
        if (error) throw error;
        if (final) {
          result = final;
        }
        callback();
    })
}
module.exports = router;