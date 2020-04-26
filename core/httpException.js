const {
  HttpException
} = require('lin-mizar')
class Success extends HttpException {
  constructor(data = null,msg = "操作成功",  code = 200, errorCode = -9999) {
    super()
    this.data = data || {}
    this.msg = msg || "操作成功"
    this.code = code || 200
    this.errorCode = errorCode || -9999
  }
}
class Forbbiden extends HttpException {
  constructor(msg, code, errorCode) {
    super()
    this.msg = msg || "禁止进入"
    this.code = code || 403
    this.errorCode = errorCode || 10001
  }
}
class ExistError extends HttpException {
  constructor(msg, code, errorCode) {
    super()
    this.msg = msg || "资源已存在"
    this.code = code || 400
    this.errorCode = errorCode || 10002
  }
}
class NotFound extends HttpException {
  constructor(msg = "资源未找到", code = 404, errorCode = 10003) {
    super()
    this.msg = msg || "资源未找到"
    this.code = code || 404
    this.errorCode = errorCode || 10003
  }
}
class AuthFailed extends HttpException {
  constructor(msg = "鉴权失败", code = 401, errorCode = 10004) {
    super()
    this.msg = msg || "鉴权失败"
    this.code = code || 401
    this.errorCode = errorCode || 10004
  }
}
module.exports = {
  Success,
  Forbbiden,
  ExistError,
  NotFound,
  AuthFailed
}