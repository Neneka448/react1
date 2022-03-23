import Router from 'koa-router'
import { ResponseBody } from '../types/network';
import useMysql from "../hooks/useMysql";
import useJWTCheck from "../hooks/useJWTCheck";
import JWT, {JwtPayload} from "jsonwebtoken";
import useAuth from "../hooks/useAuth";
const router = new Router({
  prefix:'/api/user/'
})


router.post('update',async(ctx)=>{
  console.log(ctx.request.body)
  let userInfo=ctx.request.body
  let userid:JwtPayload
  try {
    userid=useJWTCheck(userInfo.token) as JwtPayload
  }catch (e) {
    if(e instanceof Error){
      ctx.response.body={
        status:'error',
        data:JSON.stringify({desc:e.message}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }else{
      ctx.response.body={
        status:'error',
        data:JSON.stringify({desc:'unknownError'}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }
    return
  }
  console.log(userid)
  if(userInfo.type==='newuser'){
    let res=await useMysql(`insert into UserBaseInfo (id,avatar,username,signature,occupation,company) 
        values 
        (${userid.id},'${userInfo.data.avatar}','${userInfo.data.username}','${userInfo.data.signature}','${userInfo.data.occupation}','${userInfo.data.company}') `)
    if(res instanceof Error){
      console.log(res)
      ctx.response.body={
        status:'error',
        data:JSON.stringify({desc:'unknownError'}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }
    ctx.response.body={
      status:'ok',
      data:JSON.stringify(userInfo.data),
      temp:new Date().getTime().toString()
    } as ResponseBody
  }else if(userInfo.type==='update'){
    let res=await useMysql(`update UserBaseInfo set
        avatar='${userInfo.data.avatar}',
        username='${userInfo.data.username}',
        signature='${userInfo.data.signature}', 
        occupation='${userInfo.data.occupation}',
        company='${userInfo.data.company}' 
        where id=${userid.id}
        `)
    if(res instanceof Error){
      console.log(res)
      ctx.response.body={
        status:'error',
        data:JSON.stringify({desc:'unknownError'}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }
    ctx.response.body={
      status:'ok',
      data:JSON.stringify(userInfo.data),
      temp:new Date().getTime().toString()
    } as ResponseBody
  }
})
router.get('baseinfo',async (ctx)=>{
  let answer = useAuth(ctx)
  if(answer[0]){
    ctx.response.body=answer[1]
  }
  let payload = answer[1] as JwtPayload
  let userid=payload.id
  let userBaseInfo = await useMysql(`SELECT * From UserBaseInfo where id=${userid}`)
  let followingCnt = await useMysql(`SELECT COUNT(user_id) From Follower where follower_id=${userid}`)
  let followerCnt = await useMysql(`SELECT COUNT(follower_id From Follower where user_id=${userid}`)
  let dynamicList = await useMysql(`SELECT * From Dynamic where author_id=${userid} LIMIT=10`)

})
export default router