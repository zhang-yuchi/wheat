const Router = require('koa-router')
const { registerValidator } = require('../../validators/validator')
const { User } = require('../../model/user')
const { Auth } = require('../../../middlewares/auth')
const { generateToken } = require('../../../core/util')
const { Success,ExistError } = require('../../../core/httpException')
const { Visit } = require('../../model/visit')
const router = new Router({
  prefix:"/v1/user"
})
//邮箱注册
router.post('/register',async (ctx,next)=>{
  const v = await new registerValidator().validate(ctx)
  let user = await User.findOne({
    where:{
      email:v.get('body.account')
    }
  })
  if(user){
    throw new ExistError("该邮箱已经存在")
  }
  user = {
    email:v.get('body.account'),
    password:v.get('body.password')
  }
  user = await User.create(user)
  const token = generateToken(user.id, Auth.USER)
  await Visit.addOneVisit(user.id)
  throw new Success(token)
  // console.log('123');
})
module.exports = router