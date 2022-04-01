import classnames from "classnames";
import {Outlet, useNavigate} from "react-router-dom";
import './PassageManage.css'
import {useState} from "react";
import Divider from "@/components/Divider/Divider";

export default function PassageManage(){
  const navigate = useNavigate()
  const [nowActive,setActive] = useState('passage')
  return(
    <div className={"pm-tot"}>
      <nav className={"pm-nav"}>
        <div className={"pm-nav-tab"}>
          <div className={classnames("pm-nav-tabItem",{
            "pm-nav-active":nowActive==='passage'
          })} onClick={()=>{
            setActive('passage')
            navigate('essays')
          }}>
            文章
          </div>
          <div className={classnames("pm-nav-tabItem",{
            "pm-nav-active":nowActive==='draft'
          })} onClick={()=>{
            setActive('draft')
            navigate('draft')
          }
          }>
            草稿箱
          </div>
        </div>
        <div>
          请输入关键字
        </div>
      </nav>
      <div style={{
        padding:10,
        boxSizing:'border-box'
      }}>
        <Outlet/>
      </div>
    </div>
  )
}