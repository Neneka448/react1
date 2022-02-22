import './index.css'
import {useParams} from "react-router-dom";
import PassageList from './PassageList';

export default function PassageView(){
  let {category}=useParams()
  return (
    <div className="passageView">
      <PassageList category={category}/>
    </div>
  )
}