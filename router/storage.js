/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let storage = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');



storage.get('/', (req, res) => {
    let st = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => st[key] = req.query[key]);
    sqlserver_api.Storage.find(req.query, (err, st) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: st
            }));
        }
    }, mongooseUtil.Filter);
});

storage.post('/update', (req, res) => {
    let st = {};
    Object.keys(req.body.newSt).filter((o) => !o.startsWith('_')).forEach((key) => st[key] = req.body.newSt[key]);
    let oldSt = {};
    Object.keys(req.body.oldSt).filter((o) => !o.startsWith('_')).forEach((key) => oldSt[key] = req.body.oldSt[key]);
    sqlserver_api.Storage.update(st, oldSt, (err, data) => {
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

storage.post('/add', (req, res) => {
    let st = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => st[key] = req.body[key]);
    sqlserver_api.Storage.insert(st, (err, st) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: st
            }));
        }
    }, mongooseUtil.Filter);
});

storage.post('/delete', (req, res) => {
    let st = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => st[key] = req.body[key]);
    sqlserver_api.Storage.delete(st, (err, st) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: st
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = storage;
