var args = require('./tasks/args')
var pattern = new RegExp(`(${args.js.exclude.join('|')})`, 'i')

module.exports = {
  presets: ['@babel/preset-env'],
  ignore: [(filePath) => pattern.test(require('path').basename(filePath))]
}
