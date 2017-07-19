/**
 * Created by tpeng on 2017/7/19.
 */
/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let technology = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

sqlserver_api.model("Technology", "[dbo].[T_TECHNOLOGY]", "NAME");

technology.get('/', (req, res) => {
    let tech = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => tech[key] = req.query[key]);
    sqlserver_api.Technology.find(req.query, (err, tech) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: tech
            }));
        }
    }, mongooseUtil.Filter);
});

technology.post('/update', (req, res) => {
    let tech = {};
    Object.keys(req.body.newTech).filter((o) => !o.startsWith('_')).forEach((key) => tech[key] = req.body.newTech[key]);
    let oldTech = {};
    Object.keys(req.body.oldTech).filter((o) => !o.startsWith('_')).forEach((key) => oldTech[key] = req.body.oldTech[key]);
    sqlserver_api.Technology.update(tech, oldTech, (err, data) => {
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

technology.post('/add', (req, res) => {
    let tech = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => tech[key] = req.body[key]);
    sqlserver_api.Technology.insert(tech, (err, tech) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: tech
            }));
        }
    }, mongooseUtil.Filter);
});

technology.post('/delete', (req, res) => {
    let tech = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => tech[key] = req.body[key]);
    sqlserver_api.Technology.delete(tech, (err, tech) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: tech
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = technology;
