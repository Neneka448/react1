import './index.css'
import {useParams} from "react-router-dom";
import PassageList from './PassageList';

interface PassageViewProps{
  setReading?:(sta:boolean)=>void
}

export default function PassageView(props:PassageViewProps){
  console.log(props)
  let {category}=useParams()
  return (
    <div className="passageView">
      <PassageList category={category}/>
    </div>
  )
}