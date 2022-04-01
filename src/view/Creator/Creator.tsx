import {Outlet, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {useEffect} from "react";
import Menu from "@/components/Menu/Menu";
import {faChartColumn, faHouse, faLayerGroup} from "@fortawesome/free-solid-svg-icons";
import './Creator.css'
import Button from "@/components/Button/Button";
import Avatar from "@/components/Avatar/Avatar";
const menuListLeftBar=[
  {
    name:"首页",
    icon:faHouse,
    pageTo:'home',
    isEnd:true,
  },
  {
    name:'内容管理',
    icon:faLayerGroup,
    isOpen:true,
    children:[
      {
        name:'文章管理',
        pageTo:'content/article/essays'
      },
      {
        name:'专栏管理',
        pageTo:'content/column'
      },
      {
        name:'沸点管理',
        pageTo:'content/pins'
      }
    ]
  },
  {
    name:'数据中心',
    icon:faChartColumn,
    isOpen:true,
    children: [
      {
        name:'内容数据',
        pageTo: 'data/content/article/entire'
      },
      {
        name:'关注者数据',
        pageTo: 'data/content/article/entire'
      }
    ]
  }
]

export default function Creator(){
  const isUrlMatched=useMatch({path:useResolvedPath('/creator').pathname,end:true})
  const navigate=useNavigate()
  useEffect(()=>{
    if(isUrlMatched){
      navigate('home')
    }
  })
  return (
    <div className={"creator-container"}>
      <div className={"creator-leftBar"}>
        <div className={"creator-leftBar-info"}>
          <div className={"creator-leftBar-info-avatar"}><Avatar width={60} url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"}/>Diana</div>
          <div style={{textAlign:'center'}}><Button btnType={'primary'}>写文章</Button></div>
        </div>
        <Menu  direction={'vertical'} menuList={menuListLeftBar} defaultChoose={menuListLeftBar[0]}/>
      </div>
      <div className={"creator-rightBar"}>
        <Outlet/>
      </div>

    </div>
  )
}