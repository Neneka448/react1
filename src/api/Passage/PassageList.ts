import {AxiosRequestConfig} from "axios";
import {call, put, take} from "redux-saga/effects";
import {AxiosIns} from "@/api/Axios/AxiosInstance";
import {forkModalDialog} from "@/components/ModalDialog";
import {PassageData} from "@/types/types";
const _state={
  isLoading:false,
  passageList:Array<PassageData>()
}
export function* passageListFetcher(config:AxiosRequestConfig){
  try {
    const respond:Partial<typeof _state>= yield call(AxiosIns.request,config)
    yield put({type:"PASSAGE_LIST_FETCHED",
      payload:{
        isLoading:false,
        passageList:respond
      }
    })
  }catch (e){
    yield put({type:"PASSAGE_LIST_FETCH_FAILED"})
  }
}


export function* passageListFlow(){
  yield put({type:"PASSAGE_LIST_REQUEST_PENDING"})
  const config:{type:string,payload:AxiosRequestConfig}=yield take("PASSAGE_LIST_FETCH")
  yield call(passageListFetcher,config.payload)
  yield take("PASSAGE_LIST_FETCH_FAILED")
  forkModalDialog({})
}


interface PassageListAction{
  type:"PASSAGE_LIST_FETCHED"|"PASSAGE_LIST_REQUEST_PENDING",
  payload:Partial<typeof _state>
}
export function passageListReducer(state=_state,action:PassageListAction){
  switch (action.type) {
    case "PASSAGE_LIST_REQUEST_PENDING":
      return {
        ...state,
        isLoading: true
      }
    case "PASSAGE_LIST_FETCHED":
      return {
        ...state,
        ...action.payload
      }
    default:return state
  }
}
