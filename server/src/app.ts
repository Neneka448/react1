import Koa from 'koa'
import cors from 'koa2-cors'
import Mysql from 'mysql2'
import Router from 'koa-router'
import BodyParser from 'koa-bodyparser'
interface PassageData{
  id:number,
  title:string,
  content:string,
  date:Date
}
let connection = Mysql.createConnection({
  host:'120.27.240.219',
  user:'root',
  password:'chenkai77',
  database:'passages'
})
const router = new Router({
  prefix:'/api/'
})
router.get('recommended',async (ctx,next)=>{
  ctx.set('Content-Type', 'application/json')
  let startTime=new Date().getTime()
  let endTime=0
  ctx.response.body=await new Promise<Array<PassageData>>((resolve,reject)=>{
    connection.query(`SELECT id,title,abstract,date FROM passageData`,(err,row)=>{
      endTime=new Date().getTime()
      err?reject(err):resolve(row as Array<PassageData>)
    })

  }).then(rows=>rows
  ,err=>{console.log(err);throw err})
  console.log(endTime-startTime)
})

const App=new Koa()
App.use(cors({
  origin:function(ctx){
    return 'http://localhost:3000'
  }
}))
App.use(async (ctx,next)=>{
  console.log(ctx.request.url)
  await next()
})
App.use(router.routes())

App.listen(8888)