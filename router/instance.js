/**
 * Created by morroc on 2017/7/10.
 */
let express = require('express');
let instance = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

sqlserver_api.model("Instance", "[dbo].[T_INSTANCE]", "NAME");

instance.get('/', (req, res) => {
    let ins = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.query[key]);
    sqlserver_api.Instance.find(req.query, (err, ins) => {
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
    Object.keys(req.body.newIns).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body.newIns[key]);
    let oldIns = {};
    Object.keys(req.body.oldIns).filter((o) => !o.startsWith('_')).forEach((key) => oldIns[key] = req.body.oldIns[key]);
    sqlserver_api.Instance.update(ins, oldIns, (err, data) => {
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
    sqlserver_api.Instance.insert(ins, (err, ins) => {
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

instance.post('/delete', (req, res) => {
    let ins = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => ins[key] = req.body[key]);
    sqlserver_api.Instance.delete(ins, (err, ins) => {
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