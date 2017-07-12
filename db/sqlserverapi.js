/**
 * Created by tpeng on 2017/7/11.
 */
let dbConnector = require("./dbConnector");
let util = require("util");
let sqlserver_api = {};

// TODO: make filter promise

sqlserver_api.model = function (name, table) {
    if (name === null || table === null) {
        console.log("model param is null");
        return;
    }

    let m = {};
    m.table = table;

    /*
    * Process SQL-Server Insert
    * @param {Object} new object
    * @param {Function} callback
    * @param {Function} result attribute filter
    * @param {Promise} object preprocessor
    * */
    m.insert = function (obj, cb, Filter, PreProcessor) {
        if (!obj) {
            cb("Insert param is null or undefined. Nothing to insert.");
        }

        if (PreProcessor) {
            PreProcessor(obj).then((o) => obj = o);
        }

        let params = [];
        for (let key in obj) {
            params.push(obj[key]);
        }
        dbConnector.preparedQuery(generateInsertQuery(this.table, obj), params, function(err, objs) {
            if (Filter) {
                objs.forEach((o) => Filter(o));
            }
            cb(err, objs);
        });
    };

    /*
    * Process SQL-Server Update
    * @param {Object} new object
    * @param {Object} old object
    * @param {Function} callback
    * @param {Function} result attribute filter
    * @param {Promise} object preprocessor
    * */
    m.update = function (obj, oldObj, cb, Filter, PreProcessor) {
        if (!obj || !oldObj) {
            cb("sqlserver api update error. Param is null or undefined. ");
            return;
        }

        if (PreProcessor) {
            PreProcessor(obj).then((o) => obj = o);
        }

        let params = [];
        for (let key in obj) {
            params.push(obj[key]);
        }
        for (let key in oldObj) {
            params.push(oldObj[key]);
        }
        dbConnector.preparedQuery(generateUpdateQuery(this.table, obj, oldObj), params, function(err, objs) {
            if (Filter) {
                objs.forEach((o) => Filter(o));
            }
            cb(err, objs);
        })
    };

    /*
    * Process SQL-Server Select
    * @param {Object|null|undefined} Object as Query Param
    * @param {Function} callback
    * @param {Function} result attribute filter
    * @param {Promise} object preprocessor
    * */
    m.find = function (obj, cb, Filter, PreProcessor) {
        if (util.isFunction(obj)) {
            cb = obj;
            obj = null;
        }
        if (PreProcessor) {
            PreProcessor(obj).then((o) => obj = o);
        }

        let params = [];
        for (let key in obj) {
            params.push(obj[key]);
        }
        dbConnector.preparedQuery(generateSelectQuery(this.table, obj), params, function(err, objs) {
            if (Filter) {
                objs.forEach((o) => Filter(o));
            }
            cb(err, objs);
        });
    };

    /*
    * Process SQL-Server Delete
    * @param {Object} object to delete
    * @param {Function} callback
    * @param {Function} result attribute filter
    * @param {Promise} object preprocessor
    * */
    m.delete = function (obj, cb, Filter, PreProcessor) {
        if (!obj) {
            cb("delete param is null or undefined. Nothing to delete");
        }

        if (PreProcessor) {
            PreProcessor(obj).then((o) => obj = o);
        }

        let params = [];
        for (let key in obj) {
            params.push(obj[key]);
        }
        dbConnector.preparedQuery(generateDeleteQuery(this.table, obj), params, function (err, objs) {
            if (Filter) {
                objs.forEach((o) => Filter(o));
            }
            cb(err, objs);
        });
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

function generateUpdateQuery(table, obj, oldObj) {
    let q = 'UPDATE ' + table + ' SET ';
    Object.keys(obj).forEach((key) => q += key + "=? , ");
    let pos = q.lastIndexOf(",");
    q = q.substr(0, pos);
    q += " WHERE ";
    Object.keys(oldObj).forEach((key) => q += key + "=? and ");
    pos = q.lastIndexOf("and");
    q = q.substr(0, pos);
    return q;
}

function generateDeleteQuery(table, obj) {
    let q = 'DELETE ' + table + ' WHERE ';
    Object.keys(obj).forEach((key) => q += key + "=? and ");
    let pos = q.lastIndexOf("and");
    q = q.substr(0, pos);
    return q;
}

function generateInsertQuery(table, obj) {
    let q = 'INSERT INTO ' + table + '(';
    Object.keys(obj).forEach((key) => q += key + ', ');
    let pos = q.lastIndexOf(',');
    q = q.substr(0, pos);
    q += ') VALUES ( ';
    Object.keys(obj).forEach((key) => q += '?, ');
    pos = q.lastIndexOf(',');
    q = q.substr(0, pos);
    q += ')';
    return q;
}

module.exports = sqlserver_api;