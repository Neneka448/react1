import './Divider.scss'

interface DividerProps{
  length?:number
  type:'vertical'|'horizontal'
  color?:string
  lineWidth?:number,
  interval?:number
}

export default function Divider({length,type,color='#000',lineWidth=2,interval=10}:DividerProps){
  return /*__PURE__*/ (
    <div style={{
      borderLeft:type==='vertical'?`${lineWidth}px solid ${color}`:'none',
      borderTop:type==='horizontal'?`${lineWidth}px solid ${color}`:'none',
      width:type==='horizontal'?`${length}px`:'auto',
      height:type==='vertical'?`${length}px`:'auto',
      marginTop:`${interval}px`,
      marginBottom:`${interval}px`
    }}>
    </div>
  )
}