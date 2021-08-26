const path = require('path')

module.exports = dirname => {
  return {
    entry: {bee: './src/index.ts'},
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  }
}
