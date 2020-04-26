const {
  LinValidator,
  Rule
} = require('lin-mizar')
const {
  LoginType
} = require('../lib/enum')
class registerValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', "邮箱不能为空", {
        min: 1
      }),
      new Rule('isEmail', '请输入正确的邮箱')
    ]
    this.password = [
      new Rule('isLength', "密码长度不能小于6位或者大于23位", {
        min: 6,
        max: 128
      })
    ]
  }
}
class tokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isOptional'),
      new Rule('isEmail', "请输入正确的邮箱")
    ]
    this.password = [
      new Rule('isOptional'), //
      new Rule('isLength', "密码至少6个字符", {
        min: 6,
        max: 128
      })
    ]
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('type 是必传参数')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('type参数不合法')
    }
    return "success"
  }
}
class AuthValidator extends LinValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength',"token为必传字段",{min:1})
    ]
  }
}
class ParamsValidator extends LinValidator{
  constructor(){
    super()
    this.id = [
      new Rule('isInt','id不合法')
    ]
  }
}
module.exports = {
  registerValidator,
  tokenValidator,
  AuthValidator,
  ParamsValidator
}