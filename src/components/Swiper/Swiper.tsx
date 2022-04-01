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
  return /*__PURE__*/ (
    <div className={classnames("swiper",className)}>
      <div style={{
        width:imgSet.width,
        height:imgSet.height,
        overflow:"hidden"
      }} className={"swiper-display"}>
        {imgSet.imgUrls.map((v,ind)=>{
          return (
            <SwiperItem imgCnt={imgSet.imgUrls.length} key={v} imgUrl={v} width={imgSet.width} height={imgSet.height} initialLeft={imgSet.width*ind}/>
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
    height,
    initialLeft,
    imgCnt
  } = props
  const [ok,setok] = useState(true)
  const [left,setLeft] = useState(initialLeft)
  return (
    <div className={classnames({"swiper-transform":ok},"swiper-swiperItem")} style={{
      left:left
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
      <img src={imgUrl} width={width} height={height} alt=""/>
    </div>
  )
}