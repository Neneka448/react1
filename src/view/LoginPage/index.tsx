import { useState } from 'react'
import './index.css'
interface LoginPageProps{
  closeCtl:()=>void;
}
export function LoginPage(props:LoginPageProps){
  const [account,setAccount] = useState('')
  const [psw,setPsw] = useState('')
  return (
    <>
      <header className="loginPage-title">
        <div>账密登录</div>
        <div className="loginPage-title-close"
          onClick={props.closeCtl}
        >X</div>
      </header>
      <main className="loginPage-form">
        <div className="loginPage-form-input">
          <input placeholder="请输入账号" type="text"/>
        </div>
        <div className="loginPage-form-input">
          <input placeholder="请输入密码" type="password"/>
        </div>
        <div className="loginPage-loginBtn">
          <button>登录</button>
        </div>
        <div className="loginPage-tools">
          <span>注册账号</span>
          <span>忘记密码</span>
        </div>
      </main>
      <footer className="loginPage-footer">
        注册登录即表示同意用户协议、隐私政策
      </footer>
    </>
  )
}