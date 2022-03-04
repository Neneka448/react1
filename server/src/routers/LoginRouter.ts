import Router from 'koa-router'
import { ResponseBody } from '../types/network';
import useMysql from "../hooks/useMysql";
import JWT, {JsonWebTokenError, TokenExpiredError }  from "jsonwebtoken";
import { rawUserInfoChecked } from '../types/login';
import fs from 'fs'

const router = new Router({
  prefix:'/api/auth/'
})

router.post('login',async (ctx,next)=>{
  let userInfo=ctx.request.body
  if(userInfo===undefined){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'NoInfo'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  if(userInfo.token!==undefined) {
    let user:{id:number}
    try {
      user=JWT.verify(userInfo.token, RSAPrivateKey) as {id:number}
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        ctx.response.body = {
          status: 'error',
          data: JSON.stringify({desc:'TokenExpired'}),
          temp: new Date().getTime().toString()
        } as ResponseBody<string>
        return
      } else if (e instanceof JsonWebTokenError) {
        ctx.response.body = {
          status: 'error',
          data: JSON.stringify({desc:'TokenError'}),
          temp: new Date().getTime().toString()
        } as ResponseBody<string>
        return
      }else{
        ctx.response.body = {
          status: 'error',
          data: JSON.stringify({desc:'UnknownError'}),
          temp: new Date().getTime().toString()
        } as ResponseBody<string>
        return
      }
    }
    ctx.response.body = {
      status: 'ok',
      data: JSON.stringify({token:JWT.sign({
          id:user.id
        },RSAPrivateKey,{
          expiresIn:'60s',
        })}),
      temp: new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  console.log(userInfo)
  let userDataArr = await useMysql<rawUserInfoChecked>(`select id from user where acc='${userInfo.acc}' and psw='${userInfo.psw}'`)
  console.log(userDataArr)
  if(userDataArr instanceof Error||userDataArr.length<1){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'AuthFailed'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  let userData=userDataArr[0]
  ctx.response.body={
    status:'ok',
    data:JSON.stringify({token:JWT.sign({
        id:userData.id
      },RSAPrivateKey,{
        expiresIn:'60s',
      })}),
    temp:new Date().getTime().toString()
  } as ResponseBody<string>

})
router.post('signup',async (ctx)=>{
  let userInfo=ctx.request.body
  if(userInfo===undefined){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'NoInfo'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  let data=await useMysql<{id:number|null}>(`SELECT id from user where acc='${userInfo.acc}'`)
  if(data instanceof Error||data.length>=1){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'duplicate'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  let signupInfo=await useMysql(`insert into user (acc,psw) values ('${userInfo.acc}','${userInfo.psw}')`)
  if(signupInfo instanceof Error){
    console.log(signupInfo)
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'unknownError'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  let userDataArr = await useMysql<rawUserInfoChecked>(`select id from user where acc='${userInfo.acc}' and psw='${userInfo.psw}'`)
  if(userDataArr instanceof Error){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'unknownError'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
    return
  }
  ctx.response.body={
    status:'ok',
    data:JSON.stringify({token:JWT.sign({
        id:userDataArr[0].id
      },RSAPrivateKey,{
        expiresIn:'60s',
      })}),
    temp:new Date().getTime().toString()
  } as ResponseBody<string>
})
router.post('update',async  (ctx)=>{
  let userInfo=ctx.request.body
  console.log(userInfo)
  fs.writeFileSync('./aaa.gif',userInfo.aaa,{
    encoding:'binary'
  })
  ctx.response.body=1
})

const RSAPrivateKey=`-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j9dfuIQy/RRxx7cyF/CGX
Tm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQJAQiSRHBmQZgNUiYk3v0+R
DltjXwnzxMbyYti31+F2eC1cF7OVcNgzm5aVZIScaHQdcAmm4AGr/O3d4nQVfZsI
YQIhAP9zX5mhMGiVJ9guaKa6bcNJV0bQh32G3Lf//h/mz6GnAiEAnYKNEjnhRMiw
1mTQpWbnKSD858yXKZQzPjpyMQKvUP0CIQCnREOoFBzfjjM94f2SluZChmaIrwjZ
EBK8xPoAp6DzZwIgQt3fYbNsrLS+TeXypaUv0UgN1aIHMkGWF37cZ24KW0kCIC/h
2Ztza/b9gjC3JRhEtLC5WKKU7+VIwcfV2EDDba++
-----END RSA PRIVATE KEY-----`
const RSAPublicKey=`-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ0sBvx/ZFqgtxaEHVYYIwenDncoPG7j
9dfuIQy/RRxx7cyF/CGXTm1sbLz5hPvMwRaFjX35YDb2hJTT0czf8gsCAwEAAQ==
-----END PUBLIC KEY-----`
export default router