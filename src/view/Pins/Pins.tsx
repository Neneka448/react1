import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Pins.css'
import {useState} from "react";
import classnames from "classnames";
import {Comment, DynamicInfo, UserInfo} from "@/types/UserTypes";
import DynamicBox from "./DynamicBox/DynamicBox";
import store from "../../store/store";
import Divider from '../../components/Divider/Divider';
import {_hotTopic,_dynamic,_recommendPins,_rightBarInfo,_sidebarList} from './testData'
import CommentInput from "@/components/CommentInput/CommentInput";

export default function Pins(){
  const [user,setUser] = useState(store.getState().sagaReducer.UserReducer)
  const [nowActive,setActive] = useState(0)
  const [dynamicInput,setDynamicInput] = useState('')
  const [rightBarUserInfo,setRightBarUserInfo] = useState(_rightBarInfo)
  const [recommendPins,setRecommendPins] = useState(_recommendPins)
  const [hotTopic,setHotTopic] = useState(_hotTopic)
  store.subscribe(()=>{
    setUser(store.getState().sagaReducer.UserReducer)
  })
  let sidebarList = _sidebarList
  let dynamicList:Array<DynamicInfo> = _dynamic
  return (
    <div className="pins">
      <div className="pins-sidebar-left">
        {sidebarList.map((v,ind)=>{
          return(
            <div key={ind}>
              <div
                className={classnames("pins-sidebar-left-item",{"pins-sidebar-left-item-active":ind===nowActive})}
                onClick={()=>setActive(ind)}
              >
                <FontAwesomeIcon icon={v.icon}/> {v.name}
              </div>
            </div>
          )
        })}
      </div>
      <div className="pins-main">
        <div className="pins-main-top">
          <CommentInput
            value={dynamicInput}
            onChange={(e)=>setDynamicInput(e.target.value)}
            columns={4}
            width={660}
            tools={{emj:true,img:true,link:true,topic:true}}
            persistShow
            placeholder={"快和掘友一起分享新鲜事！"}
          />
        </div>
        <div className="pins-dynamic">
          {dynamicList.map((v,ind)=>{
            return (
              <div key={v.dynamicID} className="dynamic-item">
                <DynamicBox passage={v}/>
              </div>
            )
          })}
        </div>

      </div>
      <div className="pins-sidebar-right">
        <div className="pins-myInfo">
          <div>
            <div className="pins-myInfo-intro">
              <img src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" style={{width:"0.7rem"}} alt=""/>
              {'Diana'||user.username}
            </div>
            <Divider type='horizontal' color="rgb(228,230,235)" lineWidth={1} interval={10}/>
            <div className="pins-myInfo-intro-baseInfo">
              {rightBarUserInfo.map(v=>(
                <div key={v.key} className="pins-myInfo-intro-item">
                  <div style={{marginBottom:'2px'}}>{v.num}</div>
                  <div style={{color:'#8a919f'}}>{v.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pins-recommend">
          <div style={{padding:'0.1rem 0.1rem 0 0.1rem'}}>精选沸点</div>
          <Divider type='horizontal' color="rgb(228,230,235)" lineWidth={1}/>
          <div style={{padding:'0 0.1rem 0.1rem 0.1rem'}}>
            {recommendPins.map(v=>(
              <div className="pins-recommend-item" key={v.title}>
                <div className="pins-recommend-item-header">
                  <div className="pins-recommend-header-content">
                    <div className="pins-recommend-header-title">{v.title}</div>
                    <div style={{
                      fontSize:12,
                      color:'#8a919f'
                    }}>{v.likes}赞·{v.reply}回复</div>
                  </div>
                  <div className="pins-recommend-header-img">
                    <img src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" alt="1"/>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
        <div className="pins-hotTopic">
            <div style={{padding:'10px 10px 0 10px'}}>热门话题</div>
            <Divider type={'horizontal'} color="rgb(228,230,235)" lineWidth={1} interval={10}/>
            <div style={{padding:'0 10px 10px 10px'}}>
              {hotTopic.map(v=>(
                <div key={v.topicID} className="pins-hotTopic-item">
                  <span>#{v.topicName}#</span>
                  <span>{v.value>1000?`${Math.floor(v.value/1000)}k+`:v.value}</span>
                </div>
              ))}
            </div>

        </div>
      </div>
    </div>
  )
}