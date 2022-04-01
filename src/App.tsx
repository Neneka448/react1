import React, {Suspense, useEffect, useState} from 'react';
import {Routes, Route, useNavigate, useMatch, useResolvedPath, Outlet} from 'react-router-dom'
import './App.css';
import {Home} from "./view/Home/Home";
import NavBar from './view/NavBar/NavBar'
import ReactDOM from "react-dom";
import PassageManage from "@/view/Creator/PassageManage/PassageManage";
import PassageManageItem from "@/view/Creator/PassageManage/PassageManageItem";
import Draft from './view/Creator/PassageManage/Draft';
const PassageView = React.lazy(()=>import("./view/Home/PassageView"));
const LoginPage =React.lazy(()=>import( './view/LoginPage'));
const ProfileUpdatePage = React.lazy(()=>import( "./view/User/Profile"));
const PassageViewer = React.lazy(()=>import("./view/Home/PassageView/PassageViewer/PassageViewer"));
const Pins =React.lazy(()=>import( './view/Pins/Pins'));
const Creator =React.lazy(()=>import( "@/view/Creator/Creator"));
const ComposeActivity =React.lazy(()=>import('./view/Creator/ComposeActivity/ComposeActivity'));


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
      {ReactDOM.createPortal(<NavBar
        setClose={toggleLoginPageVisible}
      />,document.getElementById('root')!)}

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
        <Route path="creator" element={<Creator/>}>
          <Route index element={<div>home</div>}/>
          <Route path={"home"} element={<ComposeActivity/>}>
          </Route>
          <Route path={"content"}>
            <Route path={"article"} element={<PassageManage/>}>
              <Route path={"essays"} element={<PassageManageItem/>}>

              </Route>
              <Route path={"draft"} element={<Draft/>}>

              </Route>
            </Route>
            <Route path={"column"}>

            </Route>
            <Route path={"pins"}>

            </Route>
          </Route>
          <Route path={"data"} element={<div>home</div>}>
            <Route path={"content"}>

            </Route>
            <Route path={"article"}>

            </Route>
          </Route>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
