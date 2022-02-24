import Koa from 'koa'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import RecommendedRouter from './routers/RecommendRouter'
import LoginRouter from './routers/LoginRouter'

const App=new Koa()
App.use(cors({
  origin:function(ctx){
    return 'http://localhost:3000'
  }
}))
App.use(bodyParser())
App.use(RecommendedRouter.routes())
App.use(LoginRouter.routes())
App.listen(8888)