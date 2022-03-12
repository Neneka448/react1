import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faClock,faFire, faLink} from '@fortawesome/free-solid-svg-icons'
import './Pins.css'
import {useState} from "react";
import classnames from "classnames";
import {faCommentDots, faFaceGrin, faImage } from '@fortawesome/free-regular-svg-icons';
import Button from "../../components/Button/Button";
import {Comment, DynamicInfo, UserInfo} from "../../types/UserTypes";
import DynamicBox from "./DynamicBox/DynamicBox";
import store from "../../store/store";
import Divider from '../../components/Divider/Divider';

export default function Pins(){
  const [user,setUser] = useState(store.getState().UserReducer)
  const [nowActive,setActive] = useState(0)
  const [dynamicInput,setDynamicInput] = useState('')
  const [rightBarUserInfo,setRightBarUserInfo] = useState([{
    key:'pins',
    name:'沸点',
    num:0
  },{
    key:'topics',
    name:'圈子',
    num:0
  },{
    key:'following',
    name:'关注',
    num:0
  },{
    key:'follower',
    name:'关注者',
    num:0
  }])
  const [recommendPins,setRecommendPins] = useState([{
    title:'【Ava】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
    likes:111,
    reply:22
  },{
    title:'【Bella】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
    likes:111,
    reply:22
  },{
    title:'【Carol】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
    likes:111,
    reply:22
  }])
  const [hotTopic,setHotTopic] = useState([
    {
      topicName:'Diana',
      topicID:'1',
      value:Math.floor(10000*Math.random())
    },
    {
      topicName:'嘉然',
      topicID:'2',
      value:Math.floor(10000*Math.random())
    },
    {
      topicName:'嘉然然',
      topicID:'3',
      value:Math.floor(10000*Math.random())
    }
  ])
  store.subscribe(()=>{
    setUser(store.getState().UserReducer)
  })
  const sidebarList = [{
    name:'最新',
    icon:faClock
  },{
    name:'热门',
    icon:faFire
  }]
  const dynamicList:Array<DynamicInfo> = [{
    title:'111',
    desc:'',
    dynamicID:'111',
    author:{
     avatar:'',
     username:'嘉然Diana',
     occupation:'diana',
     company:'',
     signature:''
    },
    content:'哈喽哈喽听得到吗',
    likes:111,
    comment:[{
      author:{
        avatar:'',
        username:'向晚大魔王',
        occupation:'ava',
        company:'',
        signature:''
      },
      content:'爱你',
      date:new Date('2022-2-3').toString(),
      reply:[],
      likes:1111,
    }],
    date:new Date('2022-2-2').toString()
  }]
  return (
    <div className="pins">
      <div className="pins-sidebar-left">
        {sidebarList.map((v,ind)=>{
          return(
            <div>
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
          <div className="pins-main-input">
          <textarea
            placeholder={"快和掘友们一起分享新鲜事！"}
            value={dynamicInput}
            onChange={(e)=>setDynamicInput(e.target.value)}/>
          </div>
          <div className="pins-main-btnGroup">
            <div className="pins-main-btnGroup-left">
              <div className="pins-main-btnGroup-item"><FontAwesomeIcon icon={faFaceGrin}/> 表情</div>
              <div className="pins-main-btnGroup-item"><FontAwesomeIcon icon={faImage}/> 图片</div>
              <div className="pins-main-btnGroup-item"><FontAwesomeIcon icon={faLink}/> 链接</div>
              <div className="pins-main-btnGroup-item"><FontAwesomeIcon icon={faCommentDots}/> 话题</div>
            </div>
            <Button className={'pins-main-btnGroup-right'} btnType={'primary'} size={'small'} disabled={dynamicInput.length===0}>
              发布
            </Button>
          </div>

        </div>
        <div className="pins-dynamic">
          {dynamicList.map((v,ind)=>{
            return (
              <div key={ind} className="dynamic-item">
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
              <img src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" width="50" alt=""/>
              {'Diana'||user.userInfo.username}
            </div>
            <Divider type='horizontal' color="rgb(228,230,235)" lineWidth={1} interval={20}/>
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
          <div style={{padding:'10px 10px 0 10px'}}>精选沸点</div>
          <Divider type='horizontal' color="rgb(228,230,235)" lineWidth={1}/>
          <div style={{padding:'0 10px 10px 10px'}}>
            {recommendPins.map(v=>(
              <div className="pins-recommend-item">
                <div className="pins-recommend-item-header">
                  <div className="pins-recommend-header-content">
                    <div className="pins-recommend-header-title">{v.title}</div>
                    <div style={{
                      fontSize:12,
                      color:'#8a919f'
                    }}>{v.likes}赞·{v.reply}回复</div>
                  </div>
                  <div className="pins-recommend-header-img">
                    <img src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" alt="1" width={60}/>
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
                <div className="pins-hotTopic-item">
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