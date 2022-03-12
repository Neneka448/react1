import './PassageViewer.css'
import {useLocation, useParams} from "react-router-dom";
import {PassageData, PassageDetail} from "../../../../types/types";

interface Passage{
  detail:PassageDetail,
  baseInfo:PassageData
}

export default function PassageViewer(){
  let passageID=useParams()
  let passage=useLocation().state as Passage
  return (
    <div className="passageViewer-content">
      <header>
        <div>
          {passage.baseInfo.title}
        </div>
        <div>
          创作时间：{passage.baseInfo.date}
        </div>
      </header>
      <p>
        {passage.detail.content}
      </p>
    </div>
  )
}