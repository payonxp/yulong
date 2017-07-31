/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let implementation = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

implementation.get('/', (req, res) => {
    let imp = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => imp[key] = req.query[key]);
    sqlserver_api.Implementation.find(req.query, (err, imp) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: imp
            }));
        }
    }, mongooseUtil.Filter);
});

implementation.post('/update', (req, res) => {
    let imp = {};
    Object.keys(req.body.newImp).filter((o) => !o.startsWith('_')).forEach((key) => imp[key] = req.body.newImp[key]);
    let oldImp = {};
    Object.keys(req.body.oldImp).filter((o) => !o.startsWith('_')).forEach((key) => oldImp[key] = req.body.oldImp[key]);
    sqlserver_api.Implementation.update(imp, oldImp, (err, data) => {
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

implementation.post('/add', (req, res) => {
    let imp = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => imp[key] = req.body[key]);
    sqlserver_api.Implementation.insert(imp, (err, imp) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: imp
            }));
        }
    }, mongooseUtil.Filter);
});

implementation.post('/delete', (req, res) => {
    let imp = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => imp[key] = req.body[key]);
    sqlserver_api.Implementation.delete(imp, (err, imp) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: imp
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = implementation;
