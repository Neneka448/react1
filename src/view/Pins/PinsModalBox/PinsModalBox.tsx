import './PinsModalBox.css'
import CommentInput from "@/components/CommentInput/CommentInput";
import {createRef, useState} from "react";
import ReactDOM from "react-dom";


interface PinsModalBoxProps{
  setClose:()=>void
}
export function PinsModalBox(props:PinsModalBoxProps){
  const [text,setText]=useState('')
  const ref = createRef<HTMLDivElement>()
  return (
    ReactDOM.createPortal(
    <div className={"pins-modal-mask"}
      onClick={(e)=>{
        if(ref.current&&e.target instanceof Node&&!ref.current.contains(e.target)){
          props.setClose()
        }
      }}
    >
      <div className={"pins-modal-main"}>
        <div ref={ref} className={"pins-modal-content"}>
          <div className={"pins-modal-title"}>
            <div>发沸点</div>
            <div onClick={props.setClose}>X</div>
          </div>
          <CommentInput
            value={text}
            onChange={e=>{setText(e.target.value)}}
            placeholder={"快和掘友一起分享新鲜事!"}
            persistShow={true}
            columns={4}
            tools={{emj:true,img:true,link:true,topic:true}}
          />
        </div>
      </div>
    </div>,document.getElementById('root')!
    )
  )
}