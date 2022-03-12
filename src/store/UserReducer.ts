import {UserState} from "../types/UserTypes"
import {LOGIN_ACTION, PROFILE_UPDATE_ACTION, UserReducerType} from "./UserAction";

const defaultState:UserState={
  isLogin:false,
  token:'',
  id:'',
  joinTime:'',
  badges:[],
  userInfo:{
    avatar:'',
    username:'',
    signature:'',
    occupation:'',
    company:''
  },
  userDynamic:{
    dynamic:[],
    passages:[],
    columns:[],
    pins:[],
    likes:[],
    collections:[],
    tags:[],
    news:[],
    courses:[]
  },
  achievement:{
    likesCount:0,
    watchCount:0,
    value:0
  },
  following:[],
  follower:[]
}

export default (state=defaultState,action:UserReducerType) =>{
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        ...action.payload
      }
    case PROFILE_UPDATE_ACTION:
      return {
        ...state,
        userInfo:action.payload
      }

    default:
      return state
  }
}