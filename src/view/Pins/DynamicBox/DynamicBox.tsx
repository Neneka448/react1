import './DynamicBox.css'
import {DynamicInfo} from '../../../types/UserTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faComment, faHeart, faMessage, faThumbsUp} from '@fortawesome/free-regular-svg-icons'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import {useState} from "react";

interface DynamicBoxProps{
  passage:DynamicInfo
}

export default function DynamicBox({passage}:DynamicBoxProps){
  const [showComment,setShowComment] = useState(false)
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

        </div>
        <div className="dynamicBox-comment-all">
          <div style={{
            marginBottom:10
          }}>全部评论</div>
          {passage.comment.map((v,ind)=>{
            return (
              <div className="dynamicBox-content-item">
                <div className="dynamicBox-comment-header">
                  <img className="dynamicBox-comment-avatar" src="https://i0.hdslb.com/bfs/face/566078c52b408571d8ae5e3bcdf57b2283024c27.jpg@240w_240h_1c_1s.webp" alt=""/>
                  <div style={{
                    marginLeft:10,
                    fontSize:14
                  }}>
                    <span>{v.author.username}</span> | <span style={{color:'#86909c'}}>{v.author.occupation} | {Number((new Date().getTime()-new Date(v.date).getTime())/3600000/24).toFixed(0)}天前</span>
                    <div className="dynamicBox-comment-content">
                      {v.content}
                    </div>
                    <div className="dynamicBox-comment-tools">
                      <div style={{marginRight:10}} className="dynamicBox-comment-tools-btn">
                        <FontAwesomeIcon icon={faThumbsUp} style={{marginRight:2}}/>
                        点赞
                      </div>
                      <div className="dynamicBox-comment-tools-btn">
                        <FontAwesomeIcon icon={faMessage} style={{marginRight:2}}/>
                        回复
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}