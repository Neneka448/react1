export function throttle(fn:()=>any){

}

export function debounce(fn: (...e: any) => void){
  let timeoutID:any
  return function(...args:any){
    if(timeoutID){
      clearTimeout(timeoutID)
      timeoutID=setTimeout(fn,300,args)
    }else{
      timeoutID=setTimeout(fn,300,args)
    }
  }
}