/**
 * Created by tpeng on 2017/7/11.
 */
let dbConnector = require("./dbConnector");
let util = require("util");
let sqlserver_api = {};

sqlserver_api.model = function (name, table, pk) {
    if (name === null || table === null || pk === null) {
        console.log("model param is null");
        return;
    }

    let m = {};
    m.table = table;
    m.pk = pk;
    m.emf = false;

    // TODO: SQL SERVER API INSERT
    m.insert = function (obj, cb) {

    };

    // TODO: SQL SERVER API UPDATE
    m.update = function (obj, cb) {

    };

    m.find = function (obj, cb) {
        if (util.isFunction(obj)) {
            cb = obj;
            obj = null;
        }
        let params = [];
        for (let key in obj)
            params.push(obj[key]);
        dbConnector.preparedQuery(generateSelectQuery(this.table, obj), params, function (err, objs) {
            let results = objs;
            if (m.emf) {
                for (let o in results) {
                    delete results[o].UpdatedBy;
                    delete results[o].CreatedBy;
                    delete results[o].RowPointer;
                    delete results[o].NoteExistsFlag;
                    delete results[o].InWorkflow;
                }
            }
            cb(err, results);
        });
    };

    // TODO: SQL SERVER API DELETE
    m.delete = function (obj, cb) {

    };

    m.enableMongooseFilter = function() {
        this.emf = true;
    };

    sqlserver_api[name] = m;
    return sqlserver_api[name];
};



function generateSelectQuery(table, obj) {
    let q ;
    if (!obj) {
        q = 'SELECT * from '+ table;
    } else {
        q = 'SELECT * from ' + table + ' WHERE ';
        Object.keys(obj).forEach((key) => q += key + "=? and ");
        let pos = q.lastIndexOf("and");
        q = q.substr(0, pos);
    }
    return q;
}

module.exports = sqlserver_api;