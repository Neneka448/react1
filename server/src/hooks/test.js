const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize('passages','root','chenkai77',{
  host:'120.27.240.219',
  port:3306,
  dialect:'mysql'
});

const user=sequelize.define('user',{
  id:{
    type:DataTypes.NUMBER,
    primaryKey:true,
  },
  acc:{
    type:DataTypes.STRING(40),
  },
  psw:{
    type:DataTypes.STRING(2048),
  }
},{
  freezeTableName:true,
  timestamps:false
});

(async ()=>{
  const users=await user.findAll()
  console.log(JSON.stringify(users,null,2))
})()