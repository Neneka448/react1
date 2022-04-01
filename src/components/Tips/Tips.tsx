import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import './Tips.scss'
import {faCircleQuestion} from "@fortawesome/free-regular-svg-icons";


interface TipsProp{
  message:string
}
const Tips:React.FC<TipsProp>=(props)=>{
  const [shouldShow,setShow]=useState(false)
  return (
    <div className={"tips"}>
      <FontAwesomeIcon  onMouseEnter={()=>{setShow(true)}} onMouseLeave={()=>{setShow(false)}} icon={faCircleQuestion}/>
      {shouldShow&&<div className={"tips-message"}>
        {props.message}
      </div>}
    </div>
  )
}
export default Tips