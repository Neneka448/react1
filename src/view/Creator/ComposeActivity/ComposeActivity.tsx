import './ComposeActivity.css'
import {Swiper} from "@/components/Swiper/Swiper";
import Divider from '@/components/Divider/Divider';
import {useNavigate} from "react-router-dom";
import Tips from "@/components/Tips/Tips";
const imgSet={
  width:1812/2,
  height:480/2,
  imgUrls:[
    'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/770d3c1964d242c794238dc281c74a86~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:1812:480.awebp?',
    'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6fa213eb6ae47aeb637bdfbbe8aa613~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:1812:480.awebp?',
    'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/819fd63fda02420084ec809dcd4af975~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:1812:480.awebp?'
  ]
}
export default function ComposeActivity(){
  const navigator = useNavigate()
  const dataPreView=[
    {name:"总关注者数",num:10,key:'tot_follower'},
    {name:"文章展现数",num:20,key:'tot_passage'},
    {name:"文章阅读数",num:5116,key:'tot_read'},
    {name:"文章点赞数",num:4546,key:'tot_like'},
    {name:"文章评论数",num:45,key:'tot_comments'},
    {name:"文章收藏数",num:21,key:'tot_collect'},
  ]
  return (
    <div>
      <div className={"activity-box"}>
        <header className={"activity-box-header"}>
          <span>创作活动</span>
          <span>查看更多</span>
        </header>
        <Divider type={'horizontal'} color={'rgb(244,245,245)'} interval={0} lineWidth={3}/>
        <div className={"activity-box-body"}>
          <Swiper imgSet={imgSet}>
          </Swiper>
        </div>

      </div>
      <div className={"activity-box"}>
        <header className={"activity-box-header"}>
          <span>数据概览<Tips message={"每天中午十二点更新，--表示无变化。"}/></span>
          <span>查看更多</span>
        </header>
        <Divider type={'horizontal'} color={'rgb(244,245,245)'} interval={0} lineWidth={3}/>
        <div className={"activity-box-body"}>
          <div className={"activity-box-data"}>
            {dataPreView.map(v=>{
              return (
                <div className={"activity-box-data-item"} key={v.key}>
                  <div style={{
                    color:"rgb(78,89,105)",
                    marginBottom:6
                  }}>
                    {v.name}
                  </div>
                  <div style={{
                    fontSize:30,
                    fontWeight:600
                  }}>
                    {v.num}
                  </div>
                  <div style={{
                    color:"rgb(78,89,105)",
                    marginTop:6
                  }}>
                    较前日 --
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>

  )
}