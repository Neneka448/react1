import {AxiosRequestConfig} from "axios";
import {call, put, take} from "redux-saga/effects";
import {AxiosIns} from "@/api/Axios/AxiosInstance";
import {forkModalDialog} from "@/components/ModalDialog";
const _state={
  isLoading:false,
  id:'',
  content:'',
  comment:[]
}
export function* passageDetailFetcher(config:AxiosRequestConfig){
  try {
    const respond:Partial<typeof _state>= yield call(AxiosIns.request,config)
    yield put({type:"PASSAGE_DETAIL_FETCHED",payload:respond})
    return true
  }catch (e){
    yield put({type:"PASSAGE_DETAIL_FETCH_FAILED"})
  }
}

export function* passageDetailFlow(){
  let retryTime=0

    yield put({type:"PASSAGE_REQUEST_PENDING"})
    const config:{type:string,payload:AxiosRequestConfig}=yield take("PASSAGE_DETAIL_FETCH")
  while(retryTime<5){
    const ok:boolean =yield call(passageDetailFetcher,config.payload)
    if(ok){
      break
    }
    yield take("PASSAGE_DETAIL_FETCH_FAILED")
    forkModalDialog({})
    retryTime++
  }
}


interface PassageDetailAction{
  type:"PASSAGE_DETAIL_FETCHED"|"PASSAGE_REQUEST_PENDING",
  payload:Partial<typeof _state>
}

export function passageDetailReducer(state=_state,action:PassageDetailAction){
  switch (action.type) {
    case "PASSAGE_REQUEST_PENDING":
      return {
        ...state,
        isLoading: true
      }
    case "PASSAGE_DETAIL_FETCHED":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}