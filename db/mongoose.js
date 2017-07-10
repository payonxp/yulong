/**
 * Created by morroc on 2017/7/10.
 */
let mongoose = require('mongoose');
mongoose.connect('mongodb://115.28.101.55/yulong/');

let Schema = mongoose.Schema;

let instanceSchema = new Schema({
    NAME: String,
    TECH: String,
    PRODUCT: String,
    LATEST: Date,
    CONFIG: String,
    WEB_PORTAL: String,
});

let mongoose_api = {};

mongoose_api.Instance = mongoose.model('Instance', instanceSchema);

module.exports = mongoose_api;