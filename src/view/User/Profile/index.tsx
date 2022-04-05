import './index.css'
import {createRef, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Store from "../../../store/store";
import {useRequest} from "@/hooks/useRequest";
import {UserInfo} from '@/types/UserTypes'
import {ProfileUpdateAction} from "@/store/UserAction";

export default function ProfileUpdatePage(){
  const navigate = useNavigate()
  const routerState=useLocation()
  const [store,setStore] = useState(Store.getState())
  const [username,setUsername] = useState(store.UserReducer.userInfo.username)
  const [signature,setSignature] = useState(store.UserReducer.userInfo.signature)
  const [occupation,setOccupation] = useState(store.UserReducer.userInfo.occupation)
  const [company,setCompany] = useState(store.UserReducer.userInfo.company)
  const [updateUserBaseInfo,isUpdateLoading,update,updateError] = useRequest<UserInfo>({
    url:'user/update',
    method:'POST',
    data:{
      token:store.UserReducer.token,
      type:(routerState.state as {type:string})?.type||'',
      data:{
        avatar:'',
        username,
        signature,
        occupation,
        company
      }
    }
  },{manual:true})
  const avatarRef=createRef<HTMLImageElement>()
  Store.subscribe(()=>{
    setStore(Store.getState())
  })
  useEffect(()=>{
    if(!store.UserReducer.isLogin){
      navigate('/passage/recommended')
    }
  },[])
  useEffect(()=>{
    if(updateUserBaseInfo){
      Store.dispatch(ProfileUpdateAction(updateUserBaseInfo))
    }
  },[updateUserBaseInfo])
  useEffect(()=>{
    if(updateError){
      console.log(updateError)
    }
  },[updateError])
  return (
    <>
      <div className="user-profile-back">
        {'<'}返回个人主页
      </div>
      <div className="user-profile-form">
        <div className="user-profile-form-setting-nav">
          <ul>
            <li>
              个人资料
            </li>
          </ul>
        </div>
        <div className="user-profile-form-baseInfo">
          <div className="user-profile-form-baseInfo-item">
            <div>
              个人资料
            </div>
            <div>
              <label className="user-profile-label">
                昵称
              </label>
              <input type="text" value={username} onChange={e=>{
                setUsername(e.target.value)
              }}/>
            </div>
            <div>
              <label className="user-profile-label">
                职业
              </label>
              <input type="text" value={occupation} onChange={e=>{
                setOccupation(e.target.value)
              }}/>
            </div>
            <div>
              <label className="user-profile-label">
                公司
              </label>
              <input type="text" value={company} onChange={e=>{
                setCompany(e.target.value)
              }}/>
            </div>
            <div style={{
              display:'flex'
            }}>
              <label className="user-profile-label">
                简介
              </label>
              <textarea value={signature} onChange={e=>{
                setSignature(e.target.value)
              }}/>
            </div>
            <div>
              <button
                className="user-profile-updateBtn"
                onClick={()=>{
                  update()
                }}
                disabled={isUpdateLoading}
              >{isUpdateLoading?'正在保存':'保存修改'}</button>
            </div>
          </div>
          <div className="user-profile-form-avatar">
            <div style={{
              position:'relative'
            }}>
              <div className="user-profile-form-avatar-btn" onClick={()=>{
                let file=document.createElement('input')
                file.type='file'
                file.onchange=async ()=>{
                  if(file.files&&file.files.length){
                    if(file.files[0].size>1024*1024*5){
                      alert(`图片${Number(file.files[0].size/(1024*1024)).toFixed(2)}MB过大`)
                      return;
                    }
                    let fileReader=new FileReader()
                    fileReader.onload=(e)=>{
                      if(avatarRef.current){
                        if(e.target){
                          avatarRef.current.src=e.target.result as string
                        }
                      }
                    }
                    fileReader.readAsDataURL(file.files[0])
                  }
                }
                file.click()

              }}>
                点击修改头像
              </div>
              <img src="https://oss.rosmontis.top/passageOther/1630459995064.jpg" ref={avatarRef} width="100" height="100" alt=""/>
            </div>
            <p style={{
              fontSize:14,
              width:100,
              marginTop:5,
              marginBottom:5,
              textAlign:'center'
            }}>
              我的头像
            </p>
            <p style={{
              margin:0,
              fontSize:12,
              width:100,
              color:'rgb(134,144,156)'
            }}>
              支持 jpg、png、jpeg 格式大小 5M 以内的图片
            </p>
          </div>
        </div>


      </div>

    </>
  )
}