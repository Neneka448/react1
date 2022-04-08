import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useState} from "react";
import store from "@/store/store";
import {useRequest} from "@/hooks/useRequest";
import {debounce} from "@/utils/utils";
import {WrappedLink} from "@/components/WrappedLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import {faAngleDown, faFaceSmile, faPen} from "@fortawesome/free-solid-svg-icons";
import './NavBar.css'
import Avatar from "@/components/Avatar/Avatar";
import {PinsModalBox} from "@/view/Pins/PinsModalBox/PinsModalBox";
import {requestFactory} from "@/hooks/requestFactory";
interface NavProps{
  setClose:(sta?:boolean)=>void,
}
interface UserData{
  token:string
}

export default function NavBar(props:NavProps){
  const navigate = useNavigate()
  const [initialState,setInitialState] = useState(true)
  const [userInfo,setUserInfo]=useState<any>(store.getState().sagaReducer.AuthorizationReducer)
  const [composeMenuShow,setComposeMenuShow] = useState(false)
  const [pinsModalShow,setPinsModalShow] = useState(false)
  const [shouldHidden,setHidden] = useState(false)
  const [isWriting,setWriting] = useState(store.getState().GlobalActionReducer.isWriting)
  // useRequest<UserData>({
  //   url:'auth/login',
  //   method:'POST',
  //   data:{
  //     token:localStorage.getItem('token')
  //   }
  // },{
  //   callback:(data,err)=>{
  //     if(data){
  //       props.setClose(false)
  //       // store.dispatch(LoginAction(true,data.token))
  //
  //       localStorage.setItem('token',data.token)
  //     }
  //     if(err){
  //       localStorage.removeItem('token')
  //     }
  //
  //   }
  // })
  useEffect(()=>{
    if(userInfo.isLogin){
      props.setClose(false)
    }
  },[userInfo.isLogin])
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
  const changeUserState=()=>{
    navigate('user',{
      state:{
        type:'update'
      }
    })
  }
  store.subscribe(()=>{
    setUserInfo(store.getState().sagaReducer.AuthorizationReducer)
    setWriting(store.getState().GlobalActionReducer.isWriting)
  })
  const changeComposeVisible=debounce((e:React.MouseEvent<HTMLDivElement>)=>{
    setComposeMenuShow(false)
  })

  return (
    <div className={classnames("navbar-container",{
      "navbarHidden":shouldHidden,
      "navbarVisible":!initialState&&!shouldHidden,
    })}
      style={{
        display:isWriting?'none':'flex'
      }}
    >
      {pinsModalShow&&<PinsModalBox setClose={()=>setPinsModalShow(false)}/>}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt=""/>
        </div>
        <div className="navbar-item">
          <WrappedLink to="/passage">首页</WrappedLink>
        </div>
        <div className="navbar-item">
          <WrappedLink to="pins">沸点</WrappedLink>
        </div>
        <div className="navbar-item">
          <WrappedLink to="course">课程</WrappedLink>
        </div>
        <div className="navbar-item">
          <WrappedLink to="news">资讯</WrappedLink>
        </div>
        <div className="navbar-item">
          <WrappedLink to="events">活动</WrappedLink>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-tools">
          <input className="navbar-right-tools-search" type="search" placeholder="搜索稀土掘金"/>
          <div className="navbar-right-tools-compose">
            <button
              style={{
                backgroundColor:'rgb(30,127,256)',
              }}
              onClick={()=>{
                navigate('/creator/home')
              }}
            >创作者中心</button>
            <button
              className='arrow'
              onMouseEnter={()=>setComposeMenuShow(true)}
            >
              <FontAwesomeIcon className={classnames({'arrowIconChange':composeMenuShow})} icon={faAngleDown} />
            </button>
            <div className="navbar-right-tools-compose-options" style={{
              visibility:composeMenuShow?'visible':'hidden'
            }}
                 onMouseLeave={changeComposeVisible}
            >
              <div className="options-btn">
                <div className="options-btn-item" onClick={()=>{navigate('/editor')}}><FontAwesomeIcon icon={faPen}/> 写文章</div>
                <div className="options-btn-item"
                  onClick={()=>{
                    setPinsModalShow(true)
                  }}
                ><FontAwesomeIcon icon={faFaceSmile}/> 发沸点</div>
              </div>
            </div>
          </div>
          {
            userInfo.isLogin
              ? <span onClick={changeUserState}><Avatar width={40} url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"}/></span>
              : <button
                className="navbar-right-loginBtn"
                onClick={()=>props.setClose(true)}
              >登录</button>
          }
        </div>

      </div>
    </div>
  )
}