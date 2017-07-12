/**
 * Created by tpeng on 2017/7/12.
 */

let express = require("express");
let test = express.Router();

let mongooseTest = require('../db/test/mongooseTest');
test.get('/mongooseTest', (req, res) => {
    mongooseTest();
});

let sqlserver_api_test = require('../db/test/sqlserverapiTest');
test.get('/sqlserverapi/:func', (req, res) => {
    let option = req.params.func;
    if (option === 'insert') {
        sqlserver_api_test.insertTest();
    } else if (option === 'find') {
        sqlserver_api_test.findTest();
    } else if (option === 'update') {
        sqlserver_api_test.updateTest();
    } else if (option === 'delete') {
        sqlserver_api_test.deleteTest();
    }
});

module.exports = test;