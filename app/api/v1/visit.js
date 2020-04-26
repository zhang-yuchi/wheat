const Router = require('koa-router')
const { Visit } = require('../../model/visit')
const { Success } = require('../../../core/httpException')
const { ParamsValidator } = require('../../validators/validator')
const { Auth } = require('../../../middlewares/auth')
const router = new Router({
  prefix:"/v1/visit"
})
router.get('/',async (ctx,next)=>{
  const record = await Visit.findAll()
  throw new Success({number:record.length})
})
router.get('/get/:id',new Auth().m,async(ctx,next)=>{
  const v = await new ParamsValidator().validate(ctx)
  const id = v.get('path.id')
  const record = await Visit.findAll({
    uid:id
  })
  throw new Success(record)
})
module.exports = router