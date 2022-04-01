import React from "react";
import classNames from "classnames";
import './Button.scss'
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type ButtonStyleType = 'primary' | 'info' | 'danger' | 'warning'
type BtnSizeType = 'small' | 'default' | 'large'

interface ButtonBaseProps{
  loading?:boolean;
  btnType:ButtonStyleType;
  size?:BtnSizeType;
  children:React.ReactNode;
  className?:string;
}
type ButtonType=ButtonBaseProps & React.ButtonHTMLAttributes<HTMLElement>
const Button:React.FC<ButtonType>=(props)=>{
  const {
    className,
    children,
    btnType,
    size,
    loading,
    ...restProps
  }=props;
  const classname=classNames('button-base',{
    [`button-${btnType}`]:btnType,
    [`button-${size}`]:size,
  },{className:className})
  return /*__PURE__*/ (
    <button {...restProps} className={classname}>
      {loading?<FontAwesomeIcon icon={faSpinner}  className="btn-loading"/>:null}{children}
    </button>
  )
}

Button.defaultProps={
  btnType:'primary',
  size:'default'
}

export default Button