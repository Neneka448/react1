import {useEffect, useState} from 'react'
import './index.css'
import {useRequest} from "../../hooks/useRequest";
import store from "../../store/store";
import {LoginAction} from "../../store/UserAction";
import {useNavigate} from "react-router-dom";
import Button from '../../components/Button/Button'
interface LoginPageProps{
  closeCtl:()=>void;
}
interface UserData{
  token:string
}

export function LoginPage(props:LoginPageProps){
  const [pageState,setPageState] = useState('login')
  const [account,setAccount] = useState('')
  const [psw,setPsw] = useState('')
  const [repeatPsw,setRepeatPsw] = useState('')
  const [isRepeatPswOk,setIsRepeatPswOk] = useState(true)
  const [data,loginLoading,login,error]=useRequest<UserData>({
    url:'auth/login',
    method:'POST',
    data:{
      acc:account,
      psw:psw
    }
  },{
    manual:true
  })
  const [signupData,signupLoading,signup,signupError]=useRequest<UserData>({
    url:'auth/signup',
    method:'POST',
    data:{
      acc:account,
      psw:psw
    }
  },{
    manual:true
  })
  const navigate = useNavigate()
  useEffect(()=>{
    if(data){
      console.log(data.token)
      localStorage.setItem('token',data.token)
      store.dispatch(LoginAction(true,data.token))
    }
  },[data])
  useEffect(()=>{
    if(error){
      console.log(error)
      alert('登陆失败')
    }
  },[error])
  useEffect(()=>{
    if(signupData){
      localStorage.setItem('token',signupData.token)
      store.dispatch(LoginAction(true,signupData.token))
      navigate('/user',{
        state:{
          type:'newuser'
        }
      })
    }
  },[signupData])
  return (
    <>
      <header className="loginPage-title">
        <div>{pageState==='login'?'账密登录':'注册账号'}</div>
        <div className="loginPage-title-close"
          onClick={props.closeCtl}
        >X</div>
      </header>
      <main className="loginPage-form">
        <div className="loginPage-form-input">
          <input placeholder="请输入账号" type="text" value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
        </div>
        <div className="loginPage-form-input">
          <input placeholder="请输入密码" type="password" value={psw} onChange={(e)=>{setPsw(e.target.value);setIsRepeatPswOk(e.target.value===repeatPsw)}}/>
        </div>
        {pageState==='signup'?
          <>
            <div className="loginPage-form-input">
              <input placeholder="请再次输入密码" type="password" value={repeatPsw} onChange={(e)=>{setRepeatPsw(e.target.value);setIsRepeatPswOk(e.target.value===psw)}}/>
            </div>
            {!isRepeatPswOk?<div className="pswNotMatch">*两次密码输入不一致</div>:null}
          </>
          :
          null
        }
        <div className="loginPage-loginBtn">
          {
            pageState==='login'?
              <Button
                size="default"
                btnType="primary"
                onClick={()=>login()}
                loading={loginLoading}
                disabled={loginLoading}
              >{loginLoading?'登录中':'登录'} </Button>
              :
              <Button
                size="default"
                btnType="primary"
                onClick={()=>isRepeatPswOk&&signup()}
                loading={loginLoading}
                disabled={signupLoading||!isRepeatPswOk}
              >{signupLoading?'注册中':'注册'}</Button>
          }
        </div>
        <div className="loginPage-tools">
          {
            pageState==='login'?
            <span
              className="loginPage-tools-signup"
              onClick={()=>{
                setPageState('signup')
              }}
            >注册账号</span>
            :
            <span
              className="loginPage-tools-signup"
              onClick={()=>{
                setPageState('login')
              }}
            >登录</span>
          }
          <span>忘记密码</span>
        </div>
      </main>
      <footer className="loginPage-footer">
        注册登录即表示同意用户协议、隐私政策
      </footer>
    </>
  )
}