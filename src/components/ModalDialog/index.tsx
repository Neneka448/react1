import ReactDOM from 'react-dom'
import './index.css'
interface ModalDialogProps{

}
export default function ModalDialog(props:ModalDialogProps){
  return (
    <div>

    </div>
  )
}

export function forkModalDialog(props:ModalDialogProps){
  ReactDOM.createPortal(<ModalDialog {...props}/>,document.documentElement)
}