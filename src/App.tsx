import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useMatch, useResolvedPath, Outlet} from 'react-router-dom'
import './App.css';
import {Home} from "./view/Home/Home";
import PassageView from "./view/Home/PassageView";
import { LoginPage } from './view/LoginPage';
import {ProfileUpdatePage} from "./view/User/Profile";
import PassageViewer from "./view/Home/PassageView/PassageViewer/PassageViewer";
import Pins from './view/Pins/Pins';
import NavBar from './view/NavBar/NavBar'
import ReactDOM from "react-dom";


interface LoginDialogProps{
  setClose:()=>void
}
function LoginDialog({setClose}:LoginDialogProps){
  return (
    ReactDOM.createPortal((<>
      <div className="loginPage">
        <LoginPage closeCtl={setClose}/>
      </div>
      <div className="loginPage-mask"
           onClick={setClose}
      />
    </>),document.getElementById('root')!)

  )
}

function App() {
  const [LoginPageVisibility,setLoginPageVisibility] = useState(false)
  let isUrlMatched=useMatch({path:useResolvedPath('/').pathname,end:true})
  let navigate=useNavigate()
  useEffect(()=>{
    console.log(process.env)
    if(isUrlMatched){
      navigate('passage/recommended')
    }
  },[navigate,isUrlMatched])
  const toggleLoginPageVisible = ()=>{setLoginPageVisibility(!LoginPageVisibility)}
  return (
    <div className="App">
      <NavBar
        setClose={toggleLoginPageVisible}
      />
      {LoginPageVisibility && <LoginDialog setClose={toggleLoginPageVisible}/>}
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
