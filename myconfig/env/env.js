const path=require('path')
const AppDir=path.resolve(__dirname,'../../')
const resolveApp = (relativePath)=>path.resolve(AppDir,relativePath)
const GlobalVariable = {
  React:'react'
}
//将.env中的文件载入process.env
require('dotenv-expand')(
  require('dotenv').config({
    path: resolveApp('./.env.local'),
  })
);

const StringifiedEnv={
  'process-env':JSON.stringify(process.env)
}
module.exports={
  AppDir,
  resolveApp,
  GlobalVariable,
  StringifiedEnv
}