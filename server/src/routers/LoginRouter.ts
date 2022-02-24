import Router from 'koa-router'
import { ResponseBody } from '../types/network';
import useMysql from "../hooks/useMysql";
import JWT, {JsonWebTokenError, TokenExpiredError }  from "jsonwebtoken";
import { rawUserInfoChecked } from '../types/login';

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
  let userDataArr = await useMysql<rawUserInfoChecked>(`select id,token from user where acc='${userInfo.acc}' and psw='${userInfo.psw}'`)
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
  userData.token=JWT.sign({
    id:userData.id
  },RSAPrivateKey,{
    expiresIn:'60s',
  })
  ctx.response.body={
    status:'ok',
    data:JSON.stringify({token:userData.token}),
    temp:new Date().getTime().toString()
  } as ResponseBody<string>

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