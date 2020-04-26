function isThisType(val){
  for(let key in this){
    if(this[key]==val){
      return true
    }
  }
}
const LoginType = {
  USER_MINI_PROGRAM:100,//代表小程序登录方式
  USER_EMAIL:101,//邮箱登录方式
  USER_MOBILE:102,//手机登录方式
  isThisType,
}
module.exports = {
  LoginType
}