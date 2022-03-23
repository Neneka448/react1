import Mysql from 'mysql2'

class _Mysql{
  private static _instance=new _Mysql()
  private _mysql=Mysql.createConnection({
    host:'120.27.240.219',
    user:'root',
    password:'chenkai77',
    database:'passages'
  })
  private constructor(){}
  public static getInstance(){
    return _Mysql._instance._mysql
  }
  public static retry(){
    _Mysql._instance._mysql=Mysql.createConnection({
      host:'120.27.240.219',
      user:'root',
      password:'chenkai77',
      database:'passages'
    })
  }
}

export default async function useMysql<T>(sql:string):Promise<Array<T>|Error>{
  return new Promise<T>((resolve,reject)=>{
    _Mysql.getInstance().query(sql,(err,row:T)=>{
      err?reject(err):resolve(row)
    })
  }).then((row)=>row,(err)=>{
    _Mysql.retry()
    return err
  })
}
export async function useTransaction<T extends ()=>any>(fn:T){
}