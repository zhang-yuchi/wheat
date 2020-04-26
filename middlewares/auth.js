const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { AuthValidator } = require('../app/validators/validator')
const {
  Forbbiden
} = require('../core/httpException')
class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m() { //中间件,放入需要鉴权的接口处即可
    return async (ctx, next) => {
      const v = await new AuthValidator().validate(ctx)
      const userToken = v.get('header.token')
      let errMsg = 'token不合法'
      if (!userToken) {
        throw new Forbbiden(errMsg)
      }
      try {
        let decode = jwt.verify(userToken, config.security.secretKey)
      } catch (err) {
        //这个catch判断token是否过期
        if (err.name == 'TokenExpiredError') {
          //令牌过期错误
          errMsg = "token已过期"
        }
        throw new Forbbiden(errMsg)
      }
      if (decode.scope < this.level) {
        errMsg = "权限不足"
        throw new Forbbiden(errMsg)
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
  static async verifyToken(token) {
    try {
      var decode = jwt.verify(token, security.secretKey) //解码
      return true
    } catch (err) {
      return false
    }
  }
}
module.exports = {
  Auth
}