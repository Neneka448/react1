import {PassageData} from "./types";

interface UserInfo{
  avatar:string,
  username:string,
  signature?:string,
  occupation?:string,
  company?:string
}
interface DynamicInfo{

}
interface Column{

}
interface Course{

}
interface News{

}
interface Like{

}
interface Tag{

}
interface Collection{

}
interface Bandage{

}
interface UserDynamic{
  dynamic:Array<DynamicInfo>,
  passages:Array<PassageData>,
  columns:Array<Column>,
  pins:Array<DynamicInfo>,
  likes:Array<Like>,
  collections:Array<Collection>,
  tags:Array<Tag>,
  news:Array<News>,
  courses:Array<Course>
}

interface Achievement {

}

interface FollowingList {
}

interface FollowerList {

}

interface UserState{
  isLogin:boolean
  token:string,
  id:string,
  joinTime:string,
  badges:Array<Bandage>
  userInfo:UserInfo,
  userDynamic:UserDynamic,
  achievement:Achievement,
  following:FollowingList,
  follower:FollowerList
}

export type{
  UserState
}