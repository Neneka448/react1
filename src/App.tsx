import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useMatch, useResolvedPath, Outlet} from 'react-router-dom'
import {WrappedLink} from './components/WrappedLink'
import './App.css';
import {Home} from "./view/Home/Home";
import PassageView from "./view/Home/PassageView";
import { LoginPage } from './view/LoginPage';
import store from "./store/store";
import {useRequest} from "./hooks/useRequest";
import {LoginAction} from "./store/UserAction";
import {ProfileUpdatePage} from "./view/User/Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faPen,faFaceSmile} from '@fortawesome/free-solid-svg-icons'
import {CSSTransition} from 'react-transition-group'
import PassageViewer from "./view/Home/PassageView/PassageViewer/PassageViewer";
import { debounce } from './utils/utils';
import classnames from 'classnames';
import Pins from './view/Pins/Pins';

interface NavProps{
  pageVisibilityCtl:()=>void,
  pageVisibility:boolean
}

interface UserData{
  token:string
}

function Nav(props:NavProps){
  const navigate = useNavigate()
  const [userInfo,setUserInfo]=useState(store.getState())
  const [arrowShow,setArrowShow]=useState(false)
  const [composeMenuShow,setComposeMenuShow] = useState(false)
  const [loginInfo,loginLoading,run,error]=useRequest<UserData>({
    url:'auth/login',
    method:'POST',
    data:{
      token:localStorage.getItem('token')
    }
  })
  useEffect(()=>{
    if(loginInfo){
      store.dispatch(LoginAction(true,loginInfo.token))
      localStorage.setItem('token',loginInfo!.token)
    }
  },[loginInfo])
  useEffect(()=>{
    if(error){
      console.log(error.desc)
      localStorage.removeItem('token')
    }
  },[error])
  useEffect(()=>{
    if(userInfo.UserReducer.isLogin){
      if(props.pageVisibility){
        props.pageVisibilityCtl()
      }
    }
  })
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
          userInfo.UserReducer.isLogin?<span onClick={()=>{
              navigate('user',{
                state:{
                  type:'update'
                }
              })
          }
            }>欢迎</span>:
          <button
            className="navbar-right-loginBtn"
            onClick={props.pageVisibilityCtl}
          >登录</button>
        }
      </div>
    </div>
  )
}



function App() {
  const [LoginPageVisibility,setLoginPageVisibility] = useState(false)
  let isUrlMatched=useMatch({path:useResolvedPath('/').pathname,end:true})
  let navigate=useNavigate()
  useEffect(()=>{
    if(isUrlMatched){
      navigate('passage/recommended')
    }
  },[navigate,isUrlMatched])
  return (

    <div className="App">
      <Nav
        pageVisibilityCtl={()=>setLoginPageVisibility(!LoginPageVisibility)}
        pageVisibility={LoginPageVisibility}
      />
      {LoginPageVisibility &&
        <>
          <div className="loginPage">
            <LoginPage closeCtl={()=>setLoginPageVisibility(!LoginPageVisibility)}/>
          </div>
          <div className="loginPage-mask"
            onClick={()=>setLoginPageVisibility(!LoginPageVisibility)}
          />
        </>
        }
      <Routes>
        <Route path="passage" element={<Home/>}>
          <Route index element={<PassageView/>}/>
          <Route path=":category" element={<PassageView/>}/>
          <Route path="post/:passageID" element={<PassageViewer/>}/>
        </Route>
        <Route path="pins" element={<Pins/>}/>
        <Route path="course" element={<div>课程</div>}/>
        <Route path="news" element={<div>资讯</div>}/>
        <Route path="events" element={<div>活动</div>}/>
        <Route path="user" element={<div className="app-user"><ProfileUpdatePage/></div>}/>
      </Routes>
    </div>
  );
}

export default App;
