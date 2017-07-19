/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let dataConnection = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

sqlserver_api.model("DataConnection", "[dbo].[T_DATA_CONNECTION]", "NAME");

dataConnection.get('/', (req, res) => {
    let dc = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => dc[key] = req.query[key]);
    sqlserver_api.DataConnection.find(dc.query, (err, dc) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: dc
            }));
        }
    }, mongooseUtil.Filter);
});

dataConnection.post('/update', (req, res) => {
    let dc = {};
    Object.keys(req.body.newTech).filter((o) => !o.startsWith('_')).forEach((key) => dc[key] = req.body.newDc[key]);
    let oldDc = {};
    Object.keys(req.body.oldDc).filter((o) => !o.startsWith('_')).forEach((key) => oldDc[key] = req.body.oldDc[key]);
    sqlserver_api.DataConnection.update(dc, oldDc, (err, data) => {
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

dataConnection.post('/add', (req, res) => {
    let dc = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => dc[key] = req.body[key]);
    sqlserver_api.DataConnection.insert(dc, (err, dc) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: dc
            }));
        }
    }, mongooseUtil.Filter);
});

dataConnection.post('/delete', (req, res) => {
    let dc = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => dc[key] = req.body[key]);
    sqlserver_api.DataConnection.delete(dc, (err, dc) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: dc
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = dataConnection;
