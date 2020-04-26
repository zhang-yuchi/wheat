const koa = require('koa')
const cors = require('koa-cors')
const bodyparser = require('koa-bodyparser')
const InitManger = require('./core/init')
const catchError = require('./middlewares/catchException')
const app = new koa()
app.use(cors())//解决跨域问题
app.use(bodyparser())//增加body解析功能
app.use(catchError)//异常捕获 必须在initCore前面
InitManger.initCore(app)//现在全局将会挂载app,非中间件的功能将在init中实现,而不是app.js



//-------------自定义中间件----------------
app.listen(3000)