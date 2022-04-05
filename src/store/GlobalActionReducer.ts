import {GlobalActionType} from "@/store/GlobalAction";

export interface GlobalAction{
  isReading:boolean,
  isWriting:boolean
}

const GlobalActionState:GlobalAction={
  isReading:false,
  isWriting:false
}

export default (state=GlobalActionState,action:GlobalActionType)=>{
  switch (action.type) {
    case "set_reading":
      return {
        ...state,
        isReading:action.payload.newReadingState
      }
    case "set_writing":
      return {
        ...state,
        isWriting:action.payload.newWritingState
      }
    default:return state
  }
}