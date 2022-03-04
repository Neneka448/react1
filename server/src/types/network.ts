interface ResponseBody<T=string>{
  status:string;
  data:T|null;
  temp:string;
}
export type{
  ResponseBody
}