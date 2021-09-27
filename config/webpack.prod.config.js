const path = require('path')

module.exports = env => {
  return {
    entry: {index: './src/index.ts'},
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
    },
  }
}
