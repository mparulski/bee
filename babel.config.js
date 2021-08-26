module.exports = {
  "presets": [
    "@babel/typescript",
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "browsers": "cover 99.5%, last 3 versions, not ie 11"
        }
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-modules-commonjs"
  ]
}