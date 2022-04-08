import './PassageViewer.css'
import {useLocation, useParams} from "react-router-dom";
import {PassageData, PassageDetail} from "@/types/types";
import {marked} from 'marked'
import highlight from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import {useEffect, useState} from "react";
import Store from "@/store/store";
import 'highlight.js/styles/atom-one-dark.css';
import {ReadingAction} from "@/store/GlobalAction";
import Avatar from "@/components/Avatar/Avatar";
import Divider from "@/components/Divider/Divider";
import CommentInput from '@/components/CommentInput/CommentInput';
import CommentItem from "@/view/Pins/DynamicBox/CommentItem";
interface Passage{
  detail:PassageDetail,
  baseInfo:PassageData
}
highlight.registerLanguage('javascript',javascript)
marked.setOptions({
  highlight(code: string): string{
    return highlight.highlightAuto(code).value
  }
})
export default function PassageViewer(){
  let passageID=useParams()
  let passage=useLocation().state as Passage
  const store = Store
  const [isReading,setReading] = useState(store.getState().GlobalActionReducer.isReading)
  const [userInfo] = useState(store.getState().sagaReducer.UserReducer)
  const [commentText,setCommentText]=useState('')
  // const [userAchievement] = useState(store.getState().UserReducer.achievement)
  const [parsedHtml,setParsedHtml] = useState('')
  store.subscribe(()=>{
    setReading(store.getState().GlobalActionReducer.isReading)
  })
  useEffect(()=>{
    setParsedHtml(marked(passage.detail.content))
  },[])
  useEffect(()=>{
    store.dispatch(ReadingAction(true))
    return ()=>{store.dispatch(ReadingAction(false))}
  },[])

  return (
    <div className="passageViewer-content">
      <div className={"passageViewer-leftBar"}>
        <div className={"passageViewer-like"}>
          点赞
        </div>
        <div className={"passageViewer-favorite"}>
          收藏
        </div>
        <div className={"passageViewer-favorite"}>
          评论
        </div>
        <div className={"passageViewer-favorite"}>
          转发
        </div>
      </div>
      <div>
        <div className={"passageViewer-main"}>
          <header>
            <div className={"passageViewer-main-title"}>
              {passage.baseInfo.title}
            </div>
            <div className={"passageView-header"}>
              <Avatar width={50} url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"}/>
              <div className={"passageView-header-info"}>
                <div className={"passageView-header-info-username"}>{userInfo.username}</div>
                <div>{passage.baseInfo.date}</div>
              </div>
            </div>
          </header>
          <p className={"passageViewer-main-content"} dangerouslySetInnerHTML={{__html:parsedHtml}}>
          </p>
        </div>
        <div className={"passageViewer-comment"}>
          <div className={"passageViewer-comment-title"}>评论</div>
          <div className={"passageViewer-comment-input"}>
            <div className={"passageViewer-comment-input-avatar"}>
              <Avatar url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"} width={50}/>
            </div>
            <div className={"passageViewer-comment-input-main"}>
              <CommentInput value={commentText} onChange={(e)=>{
                setCommentText(e.target.value)
              }} tools={{emj:true,img:true}} columns={2} placeholder={"输入评论"} persistShow/>
            </div>
          </div>
          <div>
            {
              passage.detail.comment.map((v,ind)=>{
                return(
                  <CommentItem key={ind} className={"passageViewer-comment-real"} comment={v}/>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className={"passageViewer-sidebar"}>
        <div className={"passageViewer-author"}>
          <div className={"passageViewer-baseInfo"}>
            <Avatar url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"} width={60}/>
            <span className={"mal-sm"}>{userInfo.username}</span>
            <Divider type={'horizontal'} color={'rgb(228,230,235)'} lineWidth={1}/>
          </div>
          <div className={"passageViewer-passageInfo"}>
            <div className={"passageViewer-gain-like"}>
              {/*获得点赞: <span className={"mal-sm"}>{userAchievement.likesCount}</span>*/}//TODO:reset
            </div>
            <div>
              {/*文章被阅读: <span className={"mal-sm"}>{userAchievement.watchCount}</span>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}