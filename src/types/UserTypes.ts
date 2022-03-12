import {PassageData} from "./types";

export interface UserInfo{
  avatar:string,
  username:string,
  signature:string,
  occupation:string,
  company:string
}
export interface DynamicInfo{
  title:string,
  desc:string,
  dynamicID:string,
  author:UserInfo,
  content:string,
  likes:number,
  comment:Array<Comment>
  date:string
}

export interface Comment{
  author:UserInfo,
  date:string,
  content:string,
  reply:Array<Comment>
  likes:number,
}
interface Column{
  title:string,
  desc:string,
  date:string,
  columnID:string,
  passageNumber:number,
  subscriber:number
}
interface Course{

}
interface News{

}
export interface Tag{
  img:string,
  title:string,
  tagID:string
}
interface Collection{
  title:string,
  collectionID:string,
  passages:Array<PassageData>
  subscriber:number
}
interface Badge{
  badgeID:string,
  img:string,
  title:string,
  date:string
}
interface UserDynamic{
  dynamic:Array<DynamicInfo>,
  passages:Array<PassageData>,
  columns:Array<Column>,
  pins:Array<DynamicInfo>,
  likes:Array<UserInfo>,
  collections:Array<Collection>,
  tags:Array<Tag>,
  news:Array<News>,
  courses:Array<Course>
}

interface Achievement {
  likesCount:number,
  watchCount:number,
  value:number
}


interface UserState{
  isLogin:boolean
  token:string,
  id:string,
  joinTime:string,
  badges:Array<Badge>,
  userInfo:UserInfo,
  userDynamic:UserDynamic,
  achievement:Achievement,
  following:Array<UserInfo>,
  follower:Array<UserInfo>
}

export type{
  UserState
}