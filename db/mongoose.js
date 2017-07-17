/**
 * Created by morroc on 2017/7/10.
 */

// mongodb ODM, front-end test use only

let mongoose = require('mongoose');
let fs = require('fs');
let str = fs.readFileSync('db.json');
let obj = JSON.parse(str);

if (obj.mongodb === null) {
    console.log("no connection string");
}

mongoose.connect(obj.mongodb);

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