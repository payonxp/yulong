/**
 * Created by morroc on 2017/7/10.
 */
let express = require('express');
let instance = express.Router();

let mongoose_api = require('../db/mongoose.js');

instance.get('/', (req, res) => {
    mongoose_api.Instance.find((err, ins) => {
        if (err)
            console.log(err);
        res.send(JSON.stringify(ins));
    });
});

module.exports = instance;