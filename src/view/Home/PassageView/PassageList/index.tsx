import {useRequest} from "@/hooks/useRequest";
import { PassageDetail} from "@/types/types";
import './index.css'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {requestFactory} from "@/hooks/requestFactory";
import store from "@/store/store";
interface Props{
  category:string|undefined
}
export default function PassageList({category}:Props){
  const navigate=useNavigate()
  // let [request] =useRequest<Array<PassageData>>({
  //   method:'get',
  //   url:'passage/recommended'
  // })
  const[request,setRequest]=useState(store.getState().sagaReducer.passageListReducer.passageList)
  store.subscribe(()=>{
    setRequest(store.getState().sagaReducer.passageListReducer.passageList)
  })
  useEffect(()=>{
    requestFactory({
      type: "PASSAGE_LIST_REQUEST",
      manual:false
    })
  },[])
  let [passageData,,getPassageData] =useRequest<PassageDetail>({
    method:'get',
    url:'passage/detail'
  },{
    manual:true
  })
  useEffect(()=>{
    if(passageData&&request){
      navigate(`/passage/post/${passageData.id}`,{
        state:{
          detail:passageData,
          baseInfo:request.find(v=>v.id)
        }
      })
    }
  },[passageData,request])
  return (
    <>
      {category==='recommended'?
          <header className={"recommend-header"}>
            推荐|最新|热榜
          </header>
        :
          null
      }
      <ul style={{
        listStyle:'none',
        paddingLeft:0,
        marginTop:0,
      }}>
        {request && request.map(v=>(
          <li
            style={{
              padding:'10px 10px 10px 10px',
              borderBottom:'1px solid rgb(241,241,241)',
            }}
            className="passage-list-element"
            key={v.id}
            onClick={()=>{
              getPassageData(new URLSearchParams(`id=${v.id}`))
            }}
          >
            <div className="entry">
              <div className="passage-header">
                Myosotis | {Math.floor((new Date().getTime()-new Date(v.date).getTime())/1000/60/60/24)}天前
              </div>
              <div className="passage-body">
                <div  className="passage-body-title">
                  {v.title}
                </div>
                <div className="passage-body-abstract">
                  {v.abstract}
                </div>
              </div>
              <div className="passage-footer">
                浏览:998244353
              </div>
            </div>
          </li>
        ))}
      </ul>

    </>
  )
}