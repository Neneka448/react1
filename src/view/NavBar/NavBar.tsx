import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import store from "@/store/store";
import {useRequest} from "@/hooks/useRequest";
import {LoginAction} from "@/store/UserAction";
import {debounce} from "@/utils/utils";
import {WrappedLink} from "@/components/WrappedLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import {faAngleDown, faFaceSmile, faPen} from "@fortawesome/free-solid-svg-icons";

interface NavProps{
  setClose:()=>void,
}
interface UserData{
  token:string
}

export default function NavBar(props:NavProps){
  const navigate = useNavigate()
  const [userInfo,setUserInfo]=useState(store.getState())
  const [composeMenuShow,setComposeMenuShow] = useState(false)
  const [loginInfo,,,error]=useRequest<UserData>({
    url:'auth/login',
    method:'POST',
    data:{
      token:localStorage.getItem('token')
    }
  },{
    callback:(data,err)=>{
      if(data){
        store.dispatch(LoginAction(true,data.token))
        localStorage.setItem('token',data.token)
      }
      if(err){
        localStorage.removeItem('token')
      }

    }
  })
  const changeUserState=()=>{
    navigate('user',{
      state:{
        type:'update'
      }
    })
  }
  useEffect(()=>{
    if(userInfo.UserReducer.isLogin){
      if(props.setClose){
        props.setClose()
      }
    }
  },[userInfo.UserReducer.isLogin])
  store.subscribe(()=>{
    setUserInfo(store.getState())
  })
  const changeComposeVisible=debounce((e:React.MouseEvent<HTMLDivElement>)=>{
    setComposeMenuShow(false)
  })
  return (
    <div className="navbar-container">
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
            <button style={{
              backgroundColor:'rgb(30,127,256)',
            }}>创作者中心</button>
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
                <div className="options-btn-item"><FontAwesomeIcon icon={faPen}/> 写文章</div>
                <div className="options-btn-item"><FontAwesomeIcon icon={faFaceSmile}/> 发沸点</div>
              </div>
            </div>
          </div>
        </div>
        {
          userInfo.UserReducer.isLogin
            ? <span onClick={changeUserState}>欢迎</span>
            : <button
              className="navbar-right-loginBtn"
              onClick={props.setClose}
            >登录</button>
        }
      </div>
    </div>
  )
}