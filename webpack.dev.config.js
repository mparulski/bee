#!/usr/bin/env node

'use strict'

const path = require('path')
const {merge} = require('webpack-merge')
module.exports = () =>
  merge(
    require('@mparulski/es-project-maker-webpack/config/webpack.dev.config'),
    require(path.resolve('./config/webpack.dev.config.js')),
  )
