import Axios, {AxiosInstance, AxiosRequestConfig} from "axios";

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
export class AxiosIns{
  private static _instance = new AxiosIns()
  private _ins:AxiosInstance=Axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
  })
  private constructor() {}
  public static async request<T>(config:AxiosRequestConfig){
    const response=await AxiosIns._instance._ins.request<ResponseBody<T>>(config)

      if(response.data.status==='err'){
        throw new Error(response.data.desc)
      }
      return response.data.data
  }
}
