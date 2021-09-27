#!/usr/bin/env node 

'use strict';

const path = require('path');
const {merge} = require("webpack-merge");
module.exports = env => merge(
    require("@mparulski/es-project-maker-webpack/config/webpack.prod.config"), 
    require(path.resolve("./config/webpack.prod.config.js"))(env))