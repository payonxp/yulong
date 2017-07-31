/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let metadata = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

metadata.get('/', (req, res) => {
    let md = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => md[key] = req.query[key]);
    sqlserver_api.Metadata.find(req.query, (err, md) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: md
            }));
        }
    }, mongooseUtil.Filter);
});

metadata.post('/update', (req, res) => {
    let md = {};
    Object.keys(req.body.newMd).filter((o) => !o.startsWith('_')).forEach((key) => md[key] = req.body.newMd[key]);
    let oldMd = {};
    Object.keys(req.body.oldMd).filter((o) => !o.startsWith('_')).forEach((key) => oldMd[key] = req.body.oldMd[key]);
    sqlserver_api.Metadata.update(md, oldMd, (err, data) => {
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

metadata.post('/add', (req, res) => {
    let md = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => md[key] = req.body[key]);
    sqlserver_api.Metadata.insert(md, (err, md) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: md
            }));
        }
    }, mongooseUtil.Filter);
});

metadata.post('/delete', (req, res) => {
    let md = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => md[key] = req.body[key]);
    sqlserver_api.Metadata.delete(md, (err, md) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: md
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = metadata;
