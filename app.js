/**
 * Created by morroc on 2017/7/10.
 */

let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json()); // use application json
app.use(express.static('public')); // set static file path

// routers
let test = require('./router/test.js');
app.use('/test', test);
let instance = require('./router/instance.js');
app.use('/instance', instance);
let product = require('./router/product');
app.use('/product', product);
let technology = require('./router/technology');
app.use('/technology', technology);
let data_connection = require('./router/data_connection');
app.use('/data_connection', data_connection);
let storage = require('./router/storage');
app.use('/storage', storage);
let metadata = require('./router/metadata');
app.use('/metadata', metadata);
let implementation = require('./router/implementation');
app.use('/implementation', implementation);


let server = app.listen(3000, () => {
    let port = server.address().port;
    console.log('app listen at %s', port);
}); // start server