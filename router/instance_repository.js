let express = require('express');
let instance_repository = express.Router();

let tableMgr = require('../db/tablemgr');
let mongooseUtil = require('../db/mongooseUtil');

instance_repository.get('/', (req, res) => {
    let ins = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.query[key]);
    tableMgr.Instance.Storage.find(ins, (err, objs) => {
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

instance_repository.post('/update', (req, res) => {
    let ins = {};
    Object.keys(req.body.newIns).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body.newIns[key]);
    let oldIns = {};
    Object.keys(req.body.oldIns).filter((o) => !o.startsWith('_')).forEach((key) => oldIns[key] = req.body.oldIns[key]);
    tableMgr.Instance.Storage.update(ins, oldIns, (err, data) => {
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

instance_repository.post('/add', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.Storage.add(ins, (err, data) => {
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

instance_repository.post('/delete', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.Storage.del(ins, (err, data) => {
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

module.exports = instance_repository;