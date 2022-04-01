import './PassageManageItem.css'
import {useState} from "react";
import classnames from "classnames";

export default  function PassageManageItem(){
  const [nowActive,setActive] = useState('tot')
  return (
    <div className={"pmi"}>
      <nav className={"pmi-nav"}>
        <div className={classnames("pmi-nav-item",{
          "pmi-nav-active":nowActive==='tot'
        })} onClick={()=>{setActive('tot')}}>
          全部(0)
        </div>
        <div className={classnames("pmi-nav-item",{
          "pmi-nav-active":nowActive==='published'
        })} onClick={()=>{setActive('published')}}>
          已发布(0)
        </div>
        <div className={classnames("pmi-nav-item",{
          "pmi-nav-active":nowActive==='admitted'
        })} onClick={()=>{setActive('admitted')}}>
          审核中(0)
        </div>
        <div className={classnames("pmi-nav-item",{
          "pmi-nav-active":nowActive==='disallowed'
        })} onClick={()=>{setActive('disallowed')}}>
          未通过(0)
        </div>
      </nav>
      <div>
        no Content
      </div>
    </div>
  )
}