'use strict';
const express = require('express');
const engine = require('ejs-mate');
const app = module.exports.app = exports.app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const server = require('http').Server(app);

app.set('port', process.env.PORT || 8181);
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/dist'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('connect-livereload')({
   port: 35728
}));
require('./routers/entry')(app);

server.listen(app.get('port'));