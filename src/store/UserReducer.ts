import {UserState} from "../types/UserTypes"
import {LOGIN_ACTION, UserReducerType} from "./UserAction";

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
  achievement:{},
  following:{},
  follower:{}
}

export default (state=defaultState,action:UserReducerType) =>{
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        ...action.payload
      }
      break
    default:
      return state
  }
}