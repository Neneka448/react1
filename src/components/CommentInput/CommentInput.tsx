import './CommentInput.scss'
import React, {createRef, useEffect, useRef, useState} from "react";
import classnames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots, faFaceGrin, faImage} from "@fortawesome/free-regular-svg-icons";
import {faLink} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button/Button";

type toolType = {
  emj?: boolean,
  img?: boolean,
  link?: boolean,
  topic?: boolean
}
const toolComponent = {
  emj: {
    name: '表情',
    comp: faFaceGrin
  },
  img: {
    name: '图片',
    comp: faImage
  },
  link: {
    name: '链接',
    comp: faLink
  },
  topic: {
    name: '话题',
    comp: faCommentDots
  }
}

interface CommentInputProps {
  columns: number
  tools?: toolType,
  sender?: () => void,
  value:string
  width?:number
  persistShow?:boolean
}

type CommentProps = CommentInputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>
const CommentInput: React.FC<CommentProps> = (props) => {
  const {
    columns,
    onChange,
    value,
    placeholder,
    className,
    tools,
    sender,
    width,
    persistShow,
    ...otherProps
  } = props
  const ref=useRef<HTMLDivElement>(null)
  const [toolVisible, setToolVisible] = useState(false)
  useEffect(()=>{
    const clickHandler:(e:MouseEvent)=>void = function (e){
     if(ref.current){
       if(e.target instanceof Node){
         if(!ref.current.contains(e.target)){
           setToolVisible(false)
         }
       }
     }
    }
    document.addEventListener('mouseup',clickHandler)
    return () => {
      document.removeEventListener('mouseup',clickHandler)
    }
  },[])

  const classname = classnames('commentInput-base', className)
  return /*__PURE__*/ (
    <div ref={ref}>
      <div className="pins-main-input">
        <textarea
          style={{
            height:columns*0.34+'rem'
          }}
          className={classname}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={()=>{setToolVisible(true)}}
          {...otherProps}
        />

      </div>
      {(persistShow||toolVisible)&&<div>
        <div className="pins-main-btnGroup">
          <div className="pins-main-btnGroup-left">
            {tools && Object.keys(tools).map(v => {
              if (tools[v as keyof toolType]) {
                const thisComp = toolComponent[v as keyof typeof toolComponent]
                return (
                  <div className="pins-main-btnGroup-item" key={v}><FontAwesomeIcon icon={thisComp.comp}/> {thisComp.name}</div>
                )
              } else {
                return null
              }
            })}
          </div>
          <Button
            className={'pins-main-btnGroup-right'}
            btnType={'primary'} size={'small'}
            disabled={value.length === 0}
            onClick={sender}
          >

            发布
          </Button>
        </div>
      </div>}
    </div>
  )
}
CommentInput.defaultProps={
  columns:1,
  width:100,
  persistShow:false
}
export default CommentInput