import './Home.css'
import {Outlet, useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {WrappedLink} from "@/components/WrappedLink";
import InfoWidget from "../../components/InfoWidget";
import {useEffect, useMemo, useState} from "react";
import Store from "@/store/store";
import classnames from 'classnames';
export function Home(){
  const isUrlMatched=useMatch({path:useResolvedPath('/passage').pathname,end:true})
  const navigate=useNavigate()
  const store = Store
  const [isReading,setReading] = useState(store.getState().GlobalActionReducer.isReading)
  Store.subscribe(()=>{
    setReading(store.getState().GlobalActionReducer.isReading)
  })
  useEffect(()=>{
    if(isUrlMatched){
      navigate('recommended')
    }
  })
  const [shouldHidden,setHidden] = useState(false)
  const [initialState,setInitialState] = useState(true)
  useEffect(()=>{
    const handler=()=>{
      if(!shouldHidden&&document.documentElement.scrollTop/document.documentElement.scrollHeight>0.3){
        setHidden(true)
        if(initialState){
          setInitialState(false)
        }
      }else if(shouldHidden&&document.documentElement.scrollTop/document.documentElement.scrollHeight<=0.3){
        setHidden(false)
      }
    }
    document.addEventListener('scroll',handler)
    return ()=>{document.removeEventListener('scroll',handler)}
  },[shouldHidden])
  return (
    <div>
      {!isReading&&<nav className={classnames("home-navbar",{
        "homeNavbarHidden":shouldHidden,
        "homeNavbarVisible":!initialState&&!shouldHidden
      })}

      >
        <div className="home-navbar-list">
          <div className="home-navbar-item">
            <WrappedLink to='recommended'>综合</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='following'>关注</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='frontend'>前端</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='backend'>后端</WrappedLink>
          </div>
          <div className="home-navbar-item">
            <WrappedLink to='articles'>文章</WrappedLink>
          </div>
        </div>
      </nav>}
      <div className="home-content">
        <Outlet/>
        {!isReading&&<div className="home-content-sidebar">
          <div className="home-content-sidebar-welcome">
            <InfoWidget
              header={
                <div className={"home-checkin-hello"}>
                  下午好!
                </div>
              }
              content={
                <div className={"home-checkin-desc"}>
                点亮你在社区的每一天
                </div>
              }

            />
          </div>
          <div className="home-content-sidebar-ad">
            <InfoWidget content={<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6175104aec964d3f88670c283bd8b336~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?" alt=""/>
            }/>
          </div>
          <div className="home-content-sidebar-download">
            <InfoWidget content={
              <div style={{
                display:'flex',
                justifyContent:'space-around'
              }}>
                <img className={"home-download-img"} src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.e8f8c43.png" alt=""/>
                <div style={{
                  display:'flex',
                  flexDirection:'column',
                  justifyContent: 'space-around'
                }}>
                  <div style={{fontSize:14}}>下载稀土掘金App</div>
                  <div style={{fontSize:12}}>一个帮助开发者成长的社区</div>
                </div>
              </div>
            }/>
          </div>
          <div className="home-content-sidebar-authorRank">
            <InfoWidget
              header={
                <div style={{
                  padding:10,
                  borderBottom:'1px solid rgb(244,244,244)',
                  fontSize:13
                }}>作者榜</div>
              }
              content={
                <div>123</div>
              }

            />
          </div>
        </div>}

      </div>

    </div>
  )
}