import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import {useEffect, useState } from 'react'

interface RequestOptions<T>{
  manual?:boolean;
  callback?:(data:T|undefined,err:RequestError|null)=>void
}
interface ResponseBody<T>{
  status:'ok'|'err';
  desc:string;
  data:T;
  temp:string;
}
interface RequestError{
  desc:string
}

class AxiosIns{
  private static _instance = new AxiosIns()
  private _ins:AxiosInstance=Axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
  })
  private constructor() {}
  static getInstance(){
    return AxiosIns._instance

  }
  public async request(config:AxiosRequestConfig){
    let rawData = await this._ins(config)
    return rawData.data
  }
}

function useRequest<T>(
  config:AxiosRequestConfig
  ,options?:RequestOptions<T>
): [(T | undefined),boolean, ((payload?: URLSearchParams) => void), (RequestError | null)]
{
  const [requestData,setRequestData] = useState<T>()
  const [ready,setReady] = useState(false)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState<RequestError|null>(null)
  const [configs,setConfigs] = useState(config)
  const run =(payload?:URLSearchParams)=>{
    if(payload){
      if(configs.method?.toLowerCase()==='get'){
        let url=config.url+'?'+payload.toString()
        setConfigs({...configs,url:url})
      }else if(config.method?.toLowerCase()==='post'){
        setConfigs({...configs,data:payload})
      }
    }
    setReady(true)
  }
  useEffect(()=>{
    if(requestData){
      if(options?.callback){
        options.callback(requestData,error)
      }
    }
  },[requestData,error])
  useEffect(  ()=>{
    if(!options||!options.manual||(options.manual&&ready)){
      setLoading(true)
      let cancelToken=Axios.CancelToken
      let source=cancelToken.source()
      config.cancelToken=source.token
      AxiosIns.getInstance().request(configs).then((v:ResponseBody<T>)=>{
        if(v.status==='err'){
          setError(JSON.parse(v.desc) as RequestError)
        }else if(v.status==='ok'){
          setRequestData(v.data)
        }
        setLoading(false)
        setReady(false)
      })
      return ()=>{
        source.cancel()
      }
    }
  },[ready,configs])

  return [requestData,loading,run,error]
}

export {
  useRequest
}
