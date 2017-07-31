let dbConnector = require('./dbConnector');

let subTable = function (prime_model, sub_table, sub_model, pfk, sfk) {
    prime_model[sub_model.name] = {
        subTable: sub_table,
        subModel: sub_model,
        primeModel: prime_model,
        prime_fk: pfk,
        sub_fk: sfk,
        find: function (obj, cb, Filter, Preprocessor) {
            if (Preprocessor) {
                Preprocessor(obj);
            }

            let q = "SELECT * FROM " + sub_model.table;
            q += "WHERE " + sub_model.table + "." + sub_model.pk + " in (";
            q += "SELECT " + sub_table + "." + sfk + " FROM " + sub_table;
            q += " WHERE " + sub_table + "." + pfk + " = ? )";

            dbConnector.preparedQuery(q, [obj[prime_model.pk]], (err, objs) => {
                if (Filter && objs) {
                    objs.forEach((o) => Filter(o));
                }
                cb(err, objs);
            });
        },
        update: function(obj, oldObj, cb, Filter, Preprocessor) {
            if (Preprocessor) {
                Preprocessor(obj);
            }

            let q = 'UPDATE ' + sub_table + ' SET ';
            Object.keys(obj).forEach((key) => q += key + "=? , ");
            let pos = q.lastIndexOf(",");
            q = q.substr(0, pos);
            q += " WHERE " + pfk + ' = ? AND ' + sfk + ' = ?';

            let params = [];
            Object.keys(obj).forEach((key) => params.push(obj[key]));
            params.push(oldObj[prime_model.pk]);
            params.push(oldObj[sub_model.pk]);

            dbConnector.preparedQuery(q, params, (err, objs) => {
                if (objs && Filter) {
                    objs.forEach((o) => Filter(o));
                }
                cb(err, objs);
            });
        },
        del: function(obj, cb, Filter, Preprocessor) {
            if (Preprocessor) {
                Preprocessor(obj);
            }

            let q = 'DELETE ' + sub_table + ' WHERE ';
            q += pfk + ' = ? AND ' + sfk + ' = ?';

            let params = [obj[prime_model.pk], obj[sub_model.pk]];
            dbConnector.preparedQuery(q, params, (err, objs) => {
                if (objs && Filter) {
                    objs.forEach((o) => Filter(o));
                }
                cb(err, objs);
            });
        },
        add: function (obj, cb, Filter, Preprocessor) {
            if (Preprocessor) {
                Preprocessor(obj);
            }

            let q = 'INSERT INTO ' + table + '(';
            Object.keys(obj).forEach((key) => q += key + ', ');
            let pos = q.lastIndexOf(',');
            q = q.substr(0, pos);
            q += ') VALUES ( ';
            Object.keys(obj).forEach((key) => q += '?, ');
            pos = q.lastIndexOf(',');
            q = q.substr(0, pos);
            q += ')';

            let params = [];
            Object.keys(obj).forEach((key) => params.push(obj[key]));
            dbConnector.preparedQuery(q, params, (err, objs) => {
                if (objs && Filter) {
                    objs.forEach((o) => Filter(o));
                }
                cb(err, objs);
            });
        }
    };

};

module.exports = subTable;