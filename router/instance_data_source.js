let express = require('express');
let instance_data_source = express.Router();

let tableMgr = require('../db/tablemgr');
let mongooseUtil = require('../db/mongooseUtil');

instance_data_source.get('/', (req, res) => {
    let ins = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.query[key]);
    tableMgr.Instance.DataConnection.find(ins, (err, objs) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: objs
            }));
        }
    });
});

instance_data_source.post('/update', (req, res) => {
    let ins = {};
    Object.keys(req.body.newIns).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body.newIns[key]);
    let oldIns = {};
    Object.keys(req.body.oldIns).filter((o) => !o.startsWith('_')).forEach((key) => oldIns[key] = req.body.oldIns[key]);
    tableMgr.Instance.DataConnection.update(ins, oldIns, (err, data) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: data
            }));
        }
    }, mongooseUtil.Filter);
});

instance_data_source.post('/add', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.DataConnection.add(ins, (err, data) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: data
            }));
        }
    }, mongooseUtil.Filter, mongooseUtil.PreProcessor);
});

instance_data_source.post('/delete', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.DataConnection.del(ins, (err, data) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: data
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = instance_data_source;