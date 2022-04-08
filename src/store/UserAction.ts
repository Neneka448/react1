import { UserInfo } from "@/types/UserTypes"

export const LOGIN_SUCCEED = 'login_succeed'
export const LOGIN_FAILED = 'login_failed'
export const PROFILE_UPDATE_ACTION = 'profile_update_action'
export const LOGOUT_ACTION="LOGOUT_ACTION"
type LoginSucceedType={
  type:typeof LOGIN_SUCCEED,
  payload:{
    isLogin:boolean,
    token?:string
  }
}
type LoginFailedType={
  type:typeof LOGIN_FAILED,
  payload:{
    isLogin:false,
  }
}
type LogoutType={
  type:typeof LOGOUT_ACTION
}
type LoginActionType=LoginSucceedType|LoginFailedType|LogoutType
type ProfileUpdateActionType={
  type:typeof PROFILE_UPDATE_ACTION,
  payload:{
    avatar:string,
    username:string,
    signature:string,
    occupation:string,
    company:string,
    id:string
  }
}
function ProfileUpdateAction({avatar,username, signature,occupation,company,id}:UserInfo)
  :ProfileUpdateActionType{
  return {
    type:PROFILE_UPDATE_ACTION,
    payload:{
      avatar,
      username,
      signature,
      occupation,
      company,
      id
    }
  }

}

type UserReducerType=LoginActionType|ProfileUpdateActionType
export{
  // LoginAction,
  ProfileUpdateAction
}
export type{
  UserReducerType
}