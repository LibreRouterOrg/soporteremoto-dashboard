
//Load .env variables
require('dotenv').config()

//Run ES6 Babel plugins
require('babel-polyfill')
require('babel-register')({
    presets: ['env']
});

module.exports = require('./index.js')