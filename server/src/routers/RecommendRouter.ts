import Mysql from 'mysql2'
import Router from 'koa-router'
import useMysql from "../hooks/useMysql";
import { PassageData } from '../types/passage';
import {ResponseBody} from "../types/network";
import url from 'url'

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

router.get('detail',async(ctx)=>{
  let urlParams=ctx.request.URL.searchParams
  let id=urlParams.get('id')
  if(id){
    let passage =await useMysql<{content:string}>(`select convert(content using utf8mb4) as content from passageData where id=${id}`)
    if(passage instanceof Error){
      ctx.response.body={
        status:'error',
        data:JSON.stringify({desc:'queryError'}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }else{
      ctx.response.body={
        status:'ok',
        data:JSON.stringify({id:id,content:passage[0].content}),
        temp:new Date().getTime().toString()
      } as ResponseBody
    }
  }else{
    ctx.response.body={
      status:'error',
      data:JSON.stringify({desc:'NoID'}),
      temp:new Date().getTime().toString()
    } as ResponseBody
  }
})

export default router