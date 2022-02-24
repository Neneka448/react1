import {Action} from "redux";

export const LOGIN_ACTION = 'login_action'

type LoginActionType={
  type:typeof LOGIN_ACTION,
  payload:{
    isLogin:boolean,
    token?:string
  }
}
function LoginAction(isLogin:boolean,token?:string):LoginActionType{
  return {
    type: LOGIN_ACTION,
    payload:{
      isLogin,
      token,
    }
  }
}

type UserReducerType=LoginActionType
export{
  LoginAction
}
export type{
  UserReducerType
}