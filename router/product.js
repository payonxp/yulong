/**
 * Created by tpeng on 2017/7/19.
 */
let express = require('express');
let product = express.Router();

let sqlserver_api = require('../db/sqlserverapi.js');
let mongooseUtil = require('../db/mongooseUtil');

product.get('/', (req, res) => {
    let pro = {};
    Object.keys(req.query).filter((o) => !o.startsWith('_')).forEach((key) => pro[key] = req.query[key]);
    sqlserver_api.Product.find(req.query, (err, pro) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: pro
            }));
        }
    }, mongooseUtil.Filter);
});

product.post('/update', (req, res) => {
    let pro = {};
    Object.keys(req.body.newPro).filter((o) => !o.startsWith('_')).forEach((key) => pro[key] = req.body.newPro[key]);
    let oldPro = {};
    Object.keys(req.body.oldPro).filter((o) => !o.startsWith('_')).forEach((key) => oldIns[key] = req.body.oldPro[key]);
    sqlserver_api.Product.update(pro, oldPro, (err, data) => {
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

product.post('/add', (req, res) => {
    let pro = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => pro[key] = req.body[key]);
    sqlserver_api.Product.insert(pro, (err, pro) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: pro
            }));
        }
    }, mongooseUtil.Filter);
});

product.post('/delete', (req, res) => {
    let pro = {};
    Object.keys(req.body).filter((o) => !o.startsWith('_')).forEach((key) => pro[key] = req.body[key]);
    sqlserver_api.Product.delete(pro, (err, pro) => {
        if (err) {
            res.send(JSON.stringify({
                msg: "error",
                data: err
            }));
        } else {
            res.send(JSON.stringify({
                msg: "success",
                data: pro
            }));
        }
    }, mongooseUtil.Filter);
});
module.exports = product;
