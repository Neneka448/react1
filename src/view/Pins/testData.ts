import {faClock, faFire} from "@fortawesome/free-solid-svg-icons";

export const _rightBarInfo = [{
  key:'pins',
  name:'沸点',
  num:0
},{
  key:'topics',
  name:'圈子',
  num:0
},{
  key:'following',
  name:'关注',
  num:0
},{
  key:'follower',
  name:'关注者',
  num:0
}]

export const _recommendPins=[{
  title:'【Ava】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
  likes:111,
  reply:22
},{
  title:'【Bella】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
  likes:111,
  reply:22
},{
  title:'【Carol】你带我走吧你带我走吧你带我走吧你带我走吧你带我走吧',
  likes:111,
  reply:22
}]

export const _hotTopic=[
  {
    topicName:'Diana',
    topicID:'1',
    value:Math.floor(10000*Math.random())
  },
  {
    topicName:'嘉然',
    topicID:'2',
    value:Math.floor(10000*Math.random())
  },
  {
    topicName:'嘉然然',
    topicID:'3',
    value:Math.floor(10000*Math.random())
  }
]

export const _sidebarList=[{
  name:'最新',
  icon:faClock
},{
  name:'热门',
  icon:faFire
}]

export const _dynamic=[{
  title:'111',
  desc:'',
  dynamicID:'111',
  author:{
    avatar:'',
    username:'嘉然Diana',
    occupation:'diana',
    company:'',
    signature:''
  },
  content:'哈喽哈喽听得到吗',
  likes:111,
  comment:[{
    author:{
      avatar:'',
      username:'向晚大魔王',
      occupation:'ava',
      company:'',
      signature:''
    },
    content:'爱你',
    commentID:'222',
    date:new Date('2022-2-3').toString(),
    reply:[{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'2222',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    },{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'2222',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    }],
    likes:1111,
  }],
  date:new Date('2022-2-2').toString()
},{
  title:'111',
  desc:'',
  dynamicID:'111',
  author:{
    avatar:'',
    username:'嘉然Diana',
    occupation:'diana',
    company:'',
    signature:''
  },
  content:'哈喽哈喽听得到吗',
  likes:111,
  comment:[{
    author:{
      avatar:'',
      username:'向晚大魔王',
      occupation:'ava',
      company:'',
      signature:''
    },
    content:'爱你',
    commentID:'222',
    date:new Date('2022-2-3').toString(),
    reply:[{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'2222',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    },{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'22122',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    }],
    likes:1111,
  },{
    author:{
      avatar:'',
      username:'向晚大魔王',
      occupation:'ava',
      company:'',
      signature:''
    },
    content:'爱你',
    commentID:'2212',
    date:new Date('2022-2-3').toString(),
    reply:[{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'22122',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    },{
      author:{
        avatar:'',
        username:'嘉然Diana',
        occupation:'diana',
        company:'',
        signature:''
      },
      content:'嗨呀是我吗~',
      commentID:'22222',
      date:new Date('2022-2-4').toString(),
      reply:[],
      likes:1111,
    }],
    likes:1111,
  }],
  date:new Date('2022-2-2').toString()
}]