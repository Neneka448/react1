import Axios, {AxiosInstance, AxiosRequestConfig} from 'axios'
import {useEffect, useState } from 'react'

class AxiosIns{
  private static _instance = new AxiosIns
  private _ins:AxiosInstance=Axios.create({
    baseURL:'http://localhost:8888/api/',
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

function useRequest<T>(config:AxiosRequestConfig,deps=[]):T|undefined{
  const [requestData,setRequestData] = useState<T>()

  useEffect(  ()=>{
    let cancelToken=Axios.CancelToken
    let source=cancelToken.source()
    config.cancelToken=source.token
    AxiosIns.getInstance().request(config).then(v=>{
      setRequestData(v)
    })
    return ()=>{
      source.cancel()
    }
  },deps)
  return requestData
}

export {
  useRequest,
}
