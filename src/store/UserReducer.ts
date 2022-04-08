import {UserState} from "@/types/UserTypes"
import {PROFILE_UPDATE_ACTION, UserReducerType} from "./UserAction";
const defaultState:UserState={
  isLogin:false,
  token:'',
  id:'',
  joinTime:'',
  badges:[],
  userInfo:{
    avatar:'',
    username:'嘉然Diana',
    signature:'关注嘉然顿顿解馋',
    occupation:'枝江大学',
    company:'',
    id:'-1'
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
    case PROFILE_UPDATE_ACTION:
      return {
        ...state,
        userInfo:action.payload
      }
    default:
      return state
  }
}