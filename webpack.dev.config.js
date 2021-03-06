#!/usr/bin/env node

'use strict'

const path = require('path')
const {merge} = require('webpack-merge')
module.exports = env =>
  merge(
    require('@mparulski/es-project-maker-webpack/config/webpack.dev.config'),
    require(path.resolve('./__config/webpack.dev.config.js'))(env),
  )
