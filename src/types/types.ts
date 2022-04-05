import {Comment,Tag} from './UserTypes'
interface PassageData{
  id:string,
  title:string,
  abstract:string,
  date:string,
  see:number,
  likes:number,
  tags:Array<Tag>
}
interface PassageDetail{
  id:string,
  content:string
  comment:Array<Comment>
}
export type{
  PassageData,
  PassageDetail
}