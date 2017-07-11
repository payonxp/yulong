/**
 * Created by morroc on 2017/7/10.
 */
let express = require('express');
let instance = express.Router();

let mongoose_api = require('../db/mongoose.js');
let sqlserver_api = require('../db/sqlserverapi.js');

sqlserver_api.model("Instance", "[dbo].[T_INSTANCE]", "NAME");
sqlserver_api.Instance.enableMongooseFilter();

instance.get('/', (req, res) => {
    sqlserver_api.Instance.find((err, ins) => {
        if (err)
            console.log(err);
        res.send(JSON.stringify(ins));
    });
});

instance.post('/update', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    mongoose_api.Instance.update(ins, (err, ins) => {
        if (err)
            res.send(JSOn.stringify({
                msg: "error",
                err: err
            }));
        res.send(JSON.stringify({
            msg: "success",
            data: ins
        }));
    });
});

instance.post('/add', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    mongoose_api.Instance.insert(ins, (err, ins) => {
        if (err)
            res.send(JSOn.stringify({
                msg: "error",
                err: err
            }));
        res.send(JSON.stringify({
            msg: "success",
            data: ins
        }));
    });
});

instance.get('/sqltest', (req, res) => {
    sqlserver_api.model("instance", "[dbo].[T_INSTANCE]", "NAME");
    sqlserver_api.instance.find({NAME: "SL901 PROD", TECHNOLOGY: "Mongoose 9.03"}, (err, obj) => {
        res.send(JSON.stringify(obj));
    });
});

module.exports = instance;