import './Swiper.scss'
import React, {useLayoutEffect, useState} from "react";
import classnames from "classnames";



interface ImgSet{
  width:number;
  height:number;
  imgUrls:string[]
}
interface _SwiperProps {
  imgSet:ImgSet
}

interface _SwiperItemProps {
  imgUrl:string
  width:number;
  height:number;
  initialLeft:number;
  imgCnt:number
}

type SwiperProps = _SwiperProps & React.HTMLAttributes<HTMLDivElement>
type SwiperItemProps = _SwiperItemProps & React.HTMLAttributes<HTMLDivElement>

export const Swiper:React.FC<SwiperProps>= (props)=>{
  const {
    imgSet,
    className
  } = props
  const width=imgSet.width/100*parseFloat(getComputedStyle(document.documentElement).fontSize)
  const height=imgSet.height/100*parseFloat(getComputedStyle(document.documentElement).fontSize)
  console.log(imgSet.width/100*parseFloat(getComputedStyle(document.documentElement).fontSize))
  return /*__PURE__*/ (
    <div className={classnames("swiper",className)}>
      <div style={{
        width:width+'px',
        height:height+'px',
        overflow:"hidden"
      }} className={"swiper-display"}>
        {imgSet.imgUrls.map((v,ind)=>{
          return (
            <SwiperItem imgCnt={imgSet.imgUrls.length} key={v} imgUrl={v} width={width} height={height} initialLeft={width*ind}/>
          )
        })}
      </div>
      <div className={"swiper-btnGroup"}>

      </div>
    </div>
  )
}
export const SwiperItem:React.FC<SwiperItemProps> = (props)=>{
  const {
    imgUrl,
    width,
    initialLeft,
    imgCnt
  } = props
  const [ok,setok] = useState(true)
  const [left,setLeft] = useState(initialLeft)
  return (
    <div className={classnames({"swiper-transform":ok},"swiper-swiperItem")} style={{
      left:left+'px'
    }} onAnimationEnd={
      ()=>{
        setok(false)
        if(left-width<0){
          setLeft(width*(imgCnt-1))
        }else{
          setLeft(left-width)
        }
        setTimeout(()=>{
          console.log(new Date().getTime())
          setok(true)
        },1000)
      }
    }>
      <img src={imgUrl} style={{
        width:width+'px'
      }} alt=""/>
    </div>
  )
}