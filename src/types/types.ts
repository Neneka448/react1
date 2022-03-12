import {Comment,Tag} from './UserTypes'
interface PassageData{
  id:number,
  title:string,
  abstract:string,
  date:string,
  see:number,
  likes:number,
  comment:Array<Comment>
  tags:Array<Tag>
}
interface PassageDetail{
  id:string,
  content:string
}
export type{
  PassageData,
  PassageDetail
}