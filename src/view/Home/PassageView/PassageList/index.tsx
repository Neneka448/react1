import {useRequest} from "../../../../hooks/useRequest";
import {PassageData} from "../../../../types/types";
import './index.css'
interface Props{
  category:string|undefined
}
export default function PassageList({category}:Props){
  let [request] =useRequest<Array<PassageData>>({
    method:'get',
    url:'passage/recommended'
  })
  return (
    <>
      {category==='recommended'?
          <header
            style={{
              paddingBottom:10,
              paddingTop:10,
              paddingLeft:10,
              borderBottom:'1px solid rgb(241,241,241)',
              lineHeight:1,
            }}
          >
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