/**
 * Created by tpeng on 2017/7/12.
 */
let sqlserver_api = require('../sqlserverapi');
let mongooseUtil = require('../mongooseUtil');

let apitest = {};

// TODO: callback obj === []
apitest.insertTest = function () {
    sqlserver_api.model('Storage', 'T_STORAGE');
    sqlserver_api.Storage.insert({
        NAME: 'test'
    }, (err, obj) => {
        if (err) {
            console.log(err);
        }
        console.log(obj);
    }, mongooseUtil.Filter, mongooseUtil.PreProcessor);
};

// pass
apitest.findTest = function() {
    sqlserver_api.model('Storage', 'T_STORAGE');
    sqlserver_api.Storage.find({NAME: 'MG Application DB'}, (err, obj) => {
        if (err) {
            console.log(err);
        }
        console.log(obj);
    }, mongooseUtil.Filter);
};

// TODO: callback obj === []
apitest.updateTest = function() {
    sqlserver_api.model('Storage', 'T_STORAGE');
    sqlserver_api.Storage.update({NAME: 'new test'}, {NAME: 'test'}, (err, obj) => {
        if (err) {
            console.log(err);
        }
        console.log(obj);
    }, mongooseUtil.Filter);
};

// TODO: callback obj === []
apitest.deleteTest = function () {
    sqlserver_api.model('Storage', 'T_STORAGE');
    sqlserver_api.Storage.delete({NAME: 'new test'}, (err, obj) => {
        if (err) {
            console.log(err)
        }
        console.log(obj);
    }, mongooseUtil.Filter);
};
module.exports = apitest;