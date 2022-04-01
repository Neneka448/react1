import './index.css'
import {CSSProperties} from "react";

interface Props{
  header?: JSX.Element;
  content?:JSX.Element;
  footer?:JSX.Element;
}


export default function InfoWidget({header,content,footer}: Props){
  return /*__PURE__*/ (
    <>
    {header||null}
    {content||null}
    {footer||null}
    </>
  )
}