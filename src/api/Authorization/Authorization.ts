import {call, fork, put, take} from "redux-saga/effects"
import {AxiosIns} from "@/api/Axios/AxiosInstance";
import {AxiosRequestConfig} from "axios";
import {LOGIN_SUCCEED, LOGOUT_ACTION} from "@/store/UserAction";
interface AuthorizeAction{
  type:"AUTHORIZE_PENDING"|"LOGIN_SUCCEED"|"LOGOUT_REQUEST",
  payload:{
    isLoading?:boolean,
    token?:string,
    isLogin?:boolean
  }
}
function setToken(token:string){
  localStorage.setItem("token",token)
}
function clearToken(){
  if(localStorage.getItem("token")){
    localStorage.removeItem("token")
  }
}

export const loginFetcher=function*(config:AxiosRequestConfig){
  yield put({type:"AUTHORIZE_PENDING"})
  try {
    const loginRespond:{token:string}=yield call(AxiosIns.request,config)
    yield call(setToken,loginRespond.token)
    yield put({type:"LOGIN_SUCCEED",payload:{isLoading:false,isLogin:true,token:loginRespond.token}})
  }catch (e) {
    yield put({type:"AUTHORIZE_FAILED",payload:{err:new Error('login failed')}})
  }
}
export const signupFetcher=function*(config:AxiosRequestConfig){
  try {
    const signupRespond:{token:string}=yield call(AxiosIns.request,config)

    call(setToken,signupRespond.token)
    yield put({type:"LOGIN_SUCCEED",payload:{isLoading:false,isLogin:true,token:signupRespond.token}})
  }catch (e) {
    yield put({type:"AUTHORIZE_FAILED",payload:{err:new Error('login failed')}})
    call(clearToken)
  }
}
export interface AUTHORIZE{
  type:"AUTHORIZE_REQUEST",
  payload:{
    type:"LOGIN_REQUEST"|"SIGNUP_REQUEST",
    payload:AxiosRequestConfig
  }
}

export const loginFlow=function*(){
  while(true){
    const authorize:AUTHORIZE=yield take("AUTHORIZE_REQUEST")
    console.log(authorize,123)
    switch (authorize.payload.type) {
      case "LOGIN_REQUEST":
        yield call(loginFetcher,{
          url:'auth/login',
          method:'post',
          data:authorize.payload.payload
        })
        break
      case "SIGNUP_REQUEST":
        yield call(signupFetcher,{
          url:'auth/signup',
          method:'post',
          data:authorize.payload.payload
        })
        break
    }
    yield take(["LOGOUT_REQUEST","AUTHORIZE_FAILED"])
    put({type:"LOGOUT_ACTION"})
  }
}
export interface AuthorizationStateType{
  isLoading:boolean,
  isLogin:boolean,
  token:string
}
const _state:AuthorizationStateType={
  isLoading:false,
  isLogin:false,
  token:''
}


export function AuthorizationReducer(state=_state,action:AuthorizeAction){
  switch (action.type) {
    case "AUTHORIZE_PENDING":
      return {
        ...state,
        isLoading: true
      }
    case "LOGIN_SUCCEED":
      console.log(action,444)
      return {
        ...state,
        ...action.payload
      }
    case "LOGOUT_REQUEST":
      return {
        ...state,
        token:'',
        isLogin:false
      }
    default:
      return state
  }
}