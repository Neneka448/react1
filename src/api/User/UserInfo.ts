import {UserInfo} from "@/types/UserTypes";
import {AxiosRequestConfig} from "axios";
import {call, put, take} from "redux-saga/effects";
import {AxiosIns} from "@/api/Axios/AxiosInstance";
import {forkModalDialog} from "@/components/ModalDialog";

interface UserInfoRespond{
  status:'ok'|'err',
  desc:string,
  data:{
    isLoading:boolean,
    userInfo:UserInfo
  }
}

const _state={
  isLoading:false,
  avatar:'',
  username:'',
  signature:'',
  occupation:'',
  company:'',
  id:''
}

export type UserAction={
  type:"USER_INFO_FETCH_FAILED"|"USER_INFO_FETCHED"|"USER_INFO_REQUEST_PENDING",
  payload:Partial<typeof _state>
}

export function UserReducer(state=_state,action:UserAction){
  switch (action.type) {
    case "USER_INFO_REQUEST_PENDING":
      return {
        ...state,
        isLoading:true
      }
    case "USER_INFO_FETCHED":
      return{
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export function* passageFetcher(config:AxiosRequestConfig){
  try {
    let userInfoFetched:UserInfoRespond=yield call(AxiosIns.request,config)
    yield put({type:"USER_INFO_FETCHED",payload:{
        isLoading:false,
        userInfo:userInfoFetched.data
      }})
  }catch (e) {
    yield put({type:"USER_INFO_FETCH_FAILED"})
  }
}

export function *passageFlow(){
  yield put({type:"USER_INFO_REQUEST_PENDING"})
  const config:AxiosRequestConfig=yield take("USER_FETCH")
  yield call(passageFetcher,config)
  take(["USER_INFO_FETCH_FAILED"])
  forkModalDialog({})
}