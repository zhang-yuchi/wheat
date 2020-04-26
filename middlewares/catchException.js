const {
  HttpException
} = require('lin-mizar')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log(error);
    if (error instanceof HttpException) {
      if (error.data) {
        const {
          msg,
          code,
          errorCode,
          data
        } = error
        ctx.body = {
          msg,
          data,
          code,
          errorCode
        }
      } else {
        //已知错误
        const {
          msg,
          code,
          errorCode
        } = error
        ctx.body = {
          msg,
          code,
          errorCode
        }
        // ctx.status = code //微信小程序可以加上
      }

    } else {
      ctx.body = {
        msg: "服务器开小差了",
        code: 500,
        errorCode: 999
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError