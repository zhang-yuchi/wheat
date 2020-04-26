module.exports = {
  environment:"development",
  database:{
    dbName:'wheatSystem',
    host:"47.100.55.2",
    port:3306,
    user:'root',
    password:"cd87321181"
},
  security:{
    secretKey:"abcdefg",//密钥,用于token加密
    expiresIn:60*60*24*30//过期时间为1个月
},
}