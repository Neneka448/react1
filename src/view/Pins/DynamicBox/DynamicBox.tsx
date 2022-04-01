import './DynamicBox.css'
import {DynamicInfo} from '../../../types/UserTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment, faHeart, faMessage, faThumbsUp} from '@fortawesome/free-regular-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";
import CommentInput from "@/components/CommentInput/CommentInput";
import CommentItem from "@/view/Pins/DynamicBox/CommentItem";

interface DynamicBoxProps{
  passage:DynamicInfo,
}
export default function DynamicBox({passage}:DynamicBoxProps){
  const [showComment,setShowComment] = useState(false)
  const [commentInput,setCommentInput] = useState('')
  return(
    <>
      <div className="dynamicBox-header">
        <img className="dynamicBox-header-avatar" src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" alt=""/>
        <div className="dynamicBox-header-author">
          <div className="dynamicBox-header-authorName">
            {passage.author.username}
          </div>
          <div className="dynamicBox-header-authorInfo">
            {passage.author.occupation} · {(Number(new Date().getTime()-new Date(passage.date).getTime())/3600000/24).toFixed(0)}天前
          </div>
        </div>
      </div>
      <div className="dynamicBox-content">
        {passage.content}
      </div>
      <div className="dynamicBox-footer" style={{ borderBottom:showComment?'1px solid rgb(228,230,235)':'none'}}>
        <div className="dynamicBox-footer-item">
          <FontAwesomeIcon icon={faShareNodes}/>
          分享
        </div>|
        <div
          className="dynamicBox-footer-item"
          onClick={()=>setShowComment(!showComment)}
        >
          <FontAwesomeIcon icon={faComment}/>
          {passage.comment.length}
        </div>|
        <div className="dynamicBox-footer-item">
          <FontAwesomeIcon icon={faHeart}/>
          {passage.likes===0?"点赞":passage.likes}
        </div>
      </div>
      <div className="dynamicBox-comment" style={{
        display:showComment?'block':'none'
      }}>
        <div>
          <CommentInput
            value={commentInput}
            onChange={(e)=>setCommentInput(e.target.value)}
            columns={1}
            width={660}
            placeholder={"输入评论"}
            tools={{emj:true,img:true}}
          />
        </div>
        <div className="dynamicBox-comment-all">
          <div style={{
            marginBottom:10
          }}>全部评论</div>
          {passage.comment.map((v,ind)=>{
            return (
              <CommentItem comment={v} key={v.commentID}/>
            )
          })}
        </div>
      </div>
    </>
  )
}
