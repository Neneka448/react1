export const SET_READING='set_reading'
export const SET_WRITING='set_writing'
type ReadingAction = {
  type:typeof SET_READING,
  payload:{
    newReadingState:boolean
  }
}
type WritingAction = {
  type:typeof SET_WRITING,
  payload:{
    newWritingState:boolean
  }
}
export type GlobalActionType=ReadingAction|WritingAction
export const ReadingAction=function(newReadingState:boolean):ReadingAction{
  return {
    type:SET_READING,
    payload:{
      newReadingState
    }
  }
}
export const WritingAction=function(newWritingState:boolean):WritingAction{
  return {
    type:SET_WRITING,
    payload:{
      newWritingState
    }
  }
}