import './Editor.css'
import MEditor from '@uiw/react-md-editor'
import {useEffect, useRef, useState} from "react";
import store from "@/store/store";
import {WritingAction} from "@/store/GlobalAction";
import Avatar from "@/components/Avatar/Avatar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/Button/Button';
export default function Editor(){
  const [textInput,setText] = useState('')
  const [titleInput,setTitle] = useState('')
  const MdHeight=window.innerHeight-0.62*parseFloat(getComputedStyle(document.querySelector('html')!).fontSize)
  useEffect(()=>{
    document.title="写文章 - "+(titleInput.length?titleInput:"掘金")
  },[titleInput])
  useEffect(()=>{
    document.title="写文章 - 掘金"
    store.dispatch(WritingAction(true))
    return ()=>{
      store.dispatch(WritingAction(false))
      document.title = "掘金"
    }
  },[])
  return(
    <div className={"editor-main"}>
      <div className={"editor-title"}>
        <div className={"editor-title-input"}>
          <input type="text" value={titleInput} placeholder={"请输入标题"} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className={"editor-title-toolbar"}>
          <Button btnType={'primary'} size={'small'} className={"editor-title-toolbar-draft"}>草稿箱</Button>
          <Button btnType={'primary'} size={'small'} className={"editor-title-toolbar-publish"}>发布</Button>
          <FontAwesomeIcon icon={faRightLeft} className={"editor-switch"}/>
          <Avatar width={50} url={"https://oss.rosmontis.top/passageOther/1630459995064.jpg"}/>
        </div>
      </div>
      <div className={"editor-md-editor"}>
        <MEditor height={MdHeight} value={textInput} onChange={(e)=>setText(e||'')}/>
      </div>
    </div>
  )
}