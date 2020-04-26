const Router = require('koa-router')
const {
  tokenValidator
} = require('../../validators/validator')
const {
  LoginType
} = require('../../lib/enum')
const { Success,AuthFailed } = require('../../../core/httpException')
const { Auth } = require('../../../middlewares/auth')
const { Visit } = require('../../model/visit')
const { User } = require('../../model/user')
const { generateToken } = require('../../../core/util')
const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async (ctx, next) => {
  let token
  const v = await new tokenValidator().validate(ctx)
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.password'))
      break
    default:
      throw new AuthFailed("type不正确")
  }
  throw new Success(token)
})

async function emailLogin(account, password) {
  const user = await User.verifyEmailPassword(account, password)
  return token = generateToken(user.id, Auth.USER)
  
}
module.exports = router