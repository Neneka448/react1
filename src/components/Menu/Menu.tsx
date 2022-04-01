import React, {useContext, useEffect, useState} from "react";
import classnames from "classnames";
import {useMatch, useNavigate, useResolvedPath} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import './Menu.scss'
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
interface ActiveController{
  now:MenuItem,
  key:string
  change:(args:MenuItem,key:string)=>void
}
const ActiveContext = React.createContext<ActiveController>({now:{name:''},key:'',change:(item:MenuItem,key:string)=>{}})
export interface MenuItem{
  name:string,
  isEnd?:boolean;
  icon?:IconDefinition
  children?:MenuItem[];
  pageTo?:string
  isOpen?:boolean
}
export interface MenuCollapse{
  item:MenuItem
  layer:number
  hash:string
  open?:boolean
}
export interface ItemProps{
  item:MenuItem
  layer:number
  hash:string
}
export type MenuItemList = MenuItem[]


interface MenuProps{
  menuList:MenuItemList;
  direction:'vertical'|'horizontal';
  defaultChoose:MenuItem
}
type MenuType = MenuProps&React.HTMLAttributes<HTMLDivElement>

const MenuCollapse:React.FC<MenuCollapse> = (props)=>{
  const {
    item,
    layer,
    hash,
    open,
  } = props
  const [isOpen,setOpen]=useState(!!open)
  const ActiveController = useContext(ActiveContext)
  return /*__PURE__*/ (
      <div className={classnames("menu-list-wrapper",{
        "collapse-open":isOpen
      })}
      >
        <div className={classnames("menu-list-wrapper-title",{
          "isActiveParent":ActiveController.key.startsWith(hash)
        })} onClick={()=>{
          setOpen(!isOpen)
        }}>{item.icon&&<FontAwesomeIcon style={{
          width:24,
          marginRight:10
        }} icon={item.icon}/>}{item.name}
          <div className={"collapse-arrow"}><FontAwesomeIcon icon={faAngleDown}/></div>
        </div>
        {item.children&&item.children.map((v,ind)=>{
          return menuRender(v,layer+1,ind,hash)
        })}
      </div>
  )
}
const Item:React.FC<ItemProps> = (props)=>{

  const navigate = useNavigate()
  const ActiveController = useContext(ActiveContext)
  const {
    item,
    hash
  } = props
  return /*__PURE__*/ (
      <div
        className={classnames(item.isEnd?"menu-list-end":"menu-list-childItem",{'active':useMatch(useResolvedPath(item.pageTo!).pathname)})}
        onClick={()=>{
          ActiveController.change(item,hash)
          if(!item.children){
            item.pageTo&&navigate(item.pageTo)
          }
        }}
      >
        {item.icon&&<FontAwesomeIcon style={{
          width:24,
          marginRight:10
        }} icon={item.icon}/>}{item.name}
      </div>
  )
}
const menuRender = (item:MenuItem,layer:number,ind:number,faHash:string)=>{
  return (
    (!item.isEnd&&item.children)
      ?<MenuCollapse hash={faHash+`${layer}`+ind} key={faHash+`${layer}`+ind} item={item} layer={layer} open={!!item.isOpen}/>
      :<Item hash={faHash+`${layer}`+ind} key={faHash+`${layer}`+ind} item={item} layer={layer} />
  )
}
const Menu:React.FC<MenuType> = (props)=>{
  const {
    menuList,
    direction,
    defaultChoose,
    className
  } = props
  const [nowActive,setActive] = useState<MenuItem>(defaultChoose)
  const [nowKey,setKey] = useState('')
  const navigate=useNavigate()

  const classname = classnames('menu-base',{
    [`menu-direction-${direction}`]:direction
  },className)
  return /*__PURE__*/ (
    <ActiveContext.Provider value={{now:nowActive,key:nowKey,change:(item,key:string)=>{setKey(key);setActive(item)}}}>
      <div className={classname}>
        {menuList.map((v,ind)=>{
          return menuRender(v,0,ind,'')
        })}
      </div>
    </ActiveContext.Provider>
  )
}

export default Menu