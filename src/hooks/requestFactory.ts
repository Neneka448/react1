import {REQUEST_LIST} from "@/api/SagaRoot/SagaRoot";
import store from "@/store/store";

interface ApiOptions{
  type:REQUEST_LIST
  data?:any,
  manual?:boolean,
  dispatchAction?:string,
  urlQuery?:string
}
export const requestFactory = function(apiOptions:ApiOptions){
  const {
    type,
    data,
    manual,
    dispatchAction,
    urlQuery
  } = apiOptions
  let Api:(query?:string)=>void=()=>{
    store.dispatch({type:type} as any)
    store.dispatch({type:dispatchAction,payload:data} as any)
  }
  switch (type) {
    case "AUTHORIZATION_REQUEST":
      Api =()=>{
        console.log({type:dispatchAction,payload:data.payload})
      store.dispatch({type:type} as any)
      store.dispatch({type:dispatchAction,payload:data} as any)
    }
      break
    case "PASSAGE_DETAIL_REQUEST":
      Api=(query)=>{
        store.dispatch({type:type} as any)
        store.dispatch({type:"PASSAGE_DETAIL_FETCH",payload:{
            method: 'get',
            url:`passage/detail?${query||""}`,
          }
        } as any)
      }
      break
    case "PASSAGE_LIST_REQUEST":
      Api=()=>{
        store.dispatch({type:type} as any)
        store.dispatch({type:"PASSAGE_LIST_FETCH",
          payload:{
            method:'get',
            url:`passage/recommended`
          }
        } as any)
      }
      break
    default:
      throw new Error("bad request")
  }
  if(!manual){
    Api(urlQuery)
  }
  return Api
}