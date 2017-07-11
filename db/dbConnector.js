/**
 * Created by tpeng on 2017/7/11.
 */
let sql = require('msnodesqlv8');
let fs = require('fs');
let dbConnector = {};

// for json bom
// var buf = fs.readFileSync('db.json');
// fs.writeFileSync('db.json', buf.slice(3));

let str = fs.readFileSync('db.json');
let obj = JSON.parse(str);

if (obj.sqlServer === null) {
    console.log("no connection string");
}
let connStr = obj.sqlServer;
sql.open(connStr, function (err, conn) {
    if (err) {
        console.log(err);
    } else {
        console.log("sqlserver connect success.");
        dbConnector.query = function (q, cb) {
            conn.query(q, function (err, res) {
                cb(err, res);
            });
        };

        dbConnector.preparedQuery = function (q, p, cb) {
            conn.query(q, p, function (err, res) {
                cb(err, res);
            });
        };

        /* NOTICE:
         * for callback param cb(result, output)
         * the sp return value will always be the first member of output vector
         * and each output parameter in order will then appear
         */
        dbConnector.execSP = function (sp, p, cb) {
            let pm = conn.procedureMgr();
            pm.callproc(sp, p, function (err, res, output) {
                if (err) {
                    console.log(err);
                }
                cb(res, output);
            });
        };

        dbConnector.describeSP = function (sp, cb) {
            let pm = conn.procedureMgr();
            pm.describe(sp, cb);
        };
    }
});

module.exports = dbConnector;

