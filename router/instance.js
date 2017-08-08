/**
 * Created by morroc on 2017/7/10.
 */
let express = require('express');
let instance = express.Router();

let tableMgr = require('../db/tablemgr');
let mongooseUtil = require('../db/mongooseUtil');

let instance_cache = require('./instance_cache');
let instance_data_source = require('./instance_data_source');
let instance_repository = require('./instance_repository');

instance.use('/cache', instance_cache);
instance.use('/data_source', instance_data_source);
instance.use('/repository', instance_repository);


instance.get('/', (req, res) => {
    let ins = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.query[key]);
    tableMgr.Instance.find(ins, (err, ins) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: ins
            }));
        }
    }, mongooseUtil.Filter);
});

instance.post('/update', (req, res) => {
    let ins = {};
    Object.keys(req.body.newObj).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body.newObj[key]);
    let oldIns = {};
    Object.keys(req.body.oldObj).filter((o) => !o.startsWith('_')).forEach((key) => oldIns[key] = req.body.oldObj[key]);
    tableMgr.Instance.update(ins, oldIns, (err, data) => {
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

instance.post('/add', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.insert(ins, (err, ins) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: ins
            }));
        }
    }, mongooseUtil.Filter, mongooseUtil.PreProcessor);
});

instance.post('/delete', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    tableMgr.Instance.delete(ins, (err, ins) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: ins
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = instance;