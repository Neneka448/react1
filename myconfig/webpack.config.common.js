const path = require('path')
const {
  resolveApp, AppDir, GlobalVariable, StringifiedEnv
} = require('./env/env')
const webpack = require("webpack");

module.exports = {
  context: AppDir,
  entry: resolveApp('./src/index.tsx'),
  output: {
    path: resolveApp("./dist")
  },
  resolve: {
    extensions: ['.js','.ts','.jsx','.tsx','.json','.css'],
    alias: {
      '@':resolveApp('./src')
    }
  },
  module: {
    rules: [
      {

      }
    ]
  },
  plugins: [
    webpack.ProvidePlugin(GlobalVariable),
    webpack.DefinePlugin(StringifiedEnv)
  ],
  performance: false
}