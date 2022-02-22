import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useMatch, useResolvedPath} from 'react-router-dom'
import {WrappedLink} from './components/WrappedLink'
import './App.css';
import {Home} from "./view/Home/Home";
import PassageView from "./view/Home/PassageView";
import { LoginPage } from './view/LoginPage';

interface NavProps{
  pageVisibilityCtl:()=>void,
}


function Nav(props:NavProps){
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
              borderRight:'1px solid rgb(53,141,255)'
            }}>创作者中心</button>
            <button>↓</button>
          </div>
        </div>
        <button
          className="navbar-right-loginBtn"
          onClick={props.pageVisibilityCtl}
        >登录</button>
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
        pageVisibilityCtl={()=>{
          setLoginPageVisibility(!LoginPageVisibility)
        }}
      />
      {LoginPageVisibility &&
        <>
          <div className="loginPage">
            <LoginPage closeCtl={()=>{
              setLoginPageVisibility(!LoginPageVisibility)
            }}/>
          </div>
          <div className="loginPage-mask"
            onClick={()=>{
              setLoginPageVisibility(!LoginPageVisibility)
            }}
          />
        </>
        }
      <Routes>
        <Route path="passage" element={<Home/>}>
          <Route index element={<PassageView/>}/>
          <Route path=":category" element={<PassageView/>}/>
        </Route>
        <Route path="pins" element={<div>沸点</div>}/>
        <Route path="course" element={<div>课程</div>}/>
        <Route path="news" element={<div>资讯</div>}/>
        <Route path="events" element={<div>活动</div>}/>
      </Routes>
    </div>
  );
}

export default App;
