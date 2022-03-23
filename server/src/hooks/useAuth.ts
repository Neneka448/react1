import useJWTCheck from "./useJWTCheck";
import {ResponseBody} from "../types/network";
import JWT from "jsonwebtoken";
export default function(ctx:any):[boolean,ResponseBody|JWT.JwtPayload|null]{
  let auth=ctx.request.header.authorization
  if(!auth){
    let responseBody:ResponseBody={
      status:'error',
      data:JSON.stringify({desc:'AuthorizeFailed'}),
      temp:new Date().getTime().toString()
    }
    return [false,responseBody]
  }
  let jwt=auth.match(/(?<=Basic )[\s\S]*/)
  if(!jwt){
    let responseBody:ResponseBody={
      status:'error',
      data:JSON.stringify({desc:'AuthorizeFailed'}),
      temp:new Date().getTime().toString()
    }
    return [false,responseBody]
  }
  let payload:JWT.JwtPayload|null=null;
  try{
    payload=useJWTCheck(jwt[0])
  }catch (e){
    if(e instanceof Error){
      let responseBody:ResponseBody={
        status:'error',
        data:JSON.stringify({desc:e.message}),
        temp:new Date().getTime().toString()
      }
      return [false,responseBody]
    }
  }

  return [true,payload]

}