const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types= require('@babel/types')
module.exports=function(code,sourcemap,ast){
  let astNew=parser.parse(code,{
    sourceType:'module'
  })
  traverse(astNew,{
    enter:function(path){
      if(types.isCallExpression(path.node.expression)){
        if(types.isMemberExpression(path.node.expression.callee)){
          if(path.node.expression.callee.object.name==="console"){
            if(path.node.expression.callee.property.name==="log"){
              console.log(111)
              path.remove()
            }
          }
        }
      }
    }
  })
  const newCode=generator(astNew).code
  return newCode
}