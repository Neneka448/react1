import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMessage, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {Comment} from '@/types/UserTypes'
import './CommentItem.css'
import React, {useEffect, useRef, useState} from "react";
import classnames from "classnames";
import CommentInput from "@/components/CommentInput/CommentInput";
interface CommentItemProps{
  comment:Comment,
  className?:string
  reply?:boolean
}
const CommentItem:React.FC<CommentItemProps>=({comment,reply,className})=> {
  const [isReplyClick,setReplyClick]=useState(false)
  const [commentInput,setCommentInput]=useState('')
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    const clickHandler:(e:MouseEvent)=>void = function (e){
      if(ref.current){
        if(e.target instanceof Node){
          if(!ref.current.contains(e.target)){
            setReplyClick(false)
          }
        }
      }
    }
    document.addEventListener('mouseup',clickHandler)
    return () => {
      document.removeEventListener('mouseup',clickHandler)
    }
  },[])
  return (
      <div className={classnames("dynamicBox-content-item",className)} style={{
        backgroundColor:reply?"rgb(252,252,252)":"white"
      }}
        ref={ref}
      >
        <div className="dynamicBox-comment-header">
          <img className="dynamicBox-comment-avatar" src={reply?"https://oss.rosmontis.top/passageOther/1630459995064.jpg":"https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@240w_240h_1c_1s.webp"} alt=""/>
          <div style={{
            marginLeft:10,
            fontSize: 14,
            flex:1
          }}>
            <span>{comment.author.username}</span> | <span style={{color:'#86909c'}}>{comment.author.occupation} | {Number((new Date().getTime()-new Date(comment.date).getTime())/3600000/24).toFixed(0)}天前</span>
            <div className="dynamicBox-comment-content">
              {comment.content}
            </div>
            <div className="dynamicBox-comment-tools">
              <div style={{marginRight:10}} className="dynamicBox-comment-tools-btn">
                <FontAwesomeIcon icon={faThumbsUp} style={{marginRight:2}}/>
                点赞
              </div>
              <div
                className="dynamicBox-comment-tools-btn"
                onClick={()=>setReplyClick(!isReplyClick)}
              >
                <FontAwesomeIcon icon={faMessage} style={{marginRight:2}}/>
                {isReplyClick?"取消回复":"回复"}
              </div>
            </div>
            {isReplyClick?<CommentInput
              value={commentInput}
              onChange={(e)=>setCommentInput(e.target.value)}
              columns={1}
              width={reply?550:600}
              placeholder={"输入评论"}
              tools={{emj:true,img:true}}
            />:null}
            <div>
              {comment.reply.map(v=>{
                return (
                  <CommentItem  comment={v} reply/>
                )
              })}
            </div>
          </div>
        </div>

      </div>
  )
}
export default CommentItem

CommentItem.defaultProps={
  reply:false
}