import { useRef } from "react";

export function useRefDep<T>(value:T){
  const ref=useRef<T>(value)

}