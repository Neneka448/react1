import { UserInfo } from "../types/UserTypes"

export const LOGIN_ACTION = 'login_action'
export const PROFILE_UPDATE_ACTION = 'profile_update_action'

type LoginActionType={
  type:typeof LOGIN_ACTION,
  payload:{
    isLogin:boolean,
    token?:string
  }
}
type ProfileUpdateActionType={
  type:typeof PROFILE_UPDATE_ACTION,
  payload:{
    avatar:string,
    username:string,
    signature:string,
    occupation:string,
    company:string
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
function ProfileUpdateAction({avatar,username, signature,occupation,company}:UserInfo)
  :ProfileUpdateActionType{
  return {
    type:PROFILE_UPDATE_ACTION,
    payload:{
      avatar,
      username,
      signature,
      occupation,
      company
    }
  }

}

type UserReducerType=LoginActionType|ProfileUpdateActionType
export{
  LoginAction,
  ProfileUpdateAction
}
export type{
  UserReducerType
}