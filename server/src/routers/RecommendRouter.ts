import Mysql from 'mysql2'
import Router from 'koa-router'
import useMysql from "../hooks/useMysql";
import { PassageData } from '../types/passage';
import {ResponseBody} from "../types/network";


const router = new Router({
  prefix:'/api/passage/'
})

router.get('recommended',async (ctx,next)=>{
  ctx.set('Content-Type', 'application/json')
  let startTime=new Date().getTime()
  let endTime=0
  let body=await useMysql<Array<PassageData>>(`SELECT id,title,abstract,date FROM passageData`).catch(e=>e)
  if(body instanceof Error){
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'error'}),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
  }else{
    ctx.response.body={
      status:'ok',
      data:JSON.stringify(body),
      temp:new Date().getTime().toString()
    } as ResponseBody<string>
  }

  endTime=new Date().getTime()
  console.log(endTime-startTime)
})

export default router