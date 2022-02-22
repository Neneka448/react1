const Mysql = require('mysql2');

let connection = Mysql.createConnection({
  host:'120.27.240.219',
  user:'root',
  password:'chenkai77',
  database:'passages'
});

(async function(){
  let data=await new Promise((resolve)=>{
    connection.query(`SELECT convert(content using utf8mb4) as content,id from passageData`,(err,row)=>{
      if(err){
        console.log(err)
      }
      resolve(row)
    })
  })
  data.map(v=>{
    return {
      id:v.id,
      abstract:v.content.slice(0,100)
    }
  }).forEach(v=>{
    connection.query(`update passageData set abstract='${v.abstract}' where id=${v.id}`,(err,row)=>{
      if(err){
        console.log(err)
      }else{
        console.log(row)
      }
    })
  })
})()

