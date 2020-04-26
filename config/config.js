module.exports = {
  environment:"development",
  database:{
    dbName:'wheatSystem',
    host:"localhost",
    port:3306,
    user:'root',
    password:""
},
  security:{
    secretKey:"abcdefg",//密钥,用于token加密
    expiresIn:60*60*24*30//过期时间为1个月
},
}