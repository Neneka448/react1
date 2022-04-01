import './Avatar.scss'
import React from "react";


interface AvatarProps{
  url:string;
  width:number
}

const Avatar:React.FC<AvatarProps> = (props)=>{
  const {
    url,
    width
  } = props
  return /*__PURE__*/ (
    <img className={"avatar-img"} src={url} style={{width:width}} alt=""/>
  )
}

export default Avatar