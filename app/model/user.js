const bcrypt = require('bcryptjs')
const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')
const {
  Visit
} = require('./visit')
const {
  NotFound,
  AuthFailed
} = require('../../core/httpException')
const { Auth } = require('../../middlewares/auth')
class User extends Model {
  static async verifyEmailPassword(account, password) {
    let user = await User.findOne({
      where:{
        email: account
      }
    })
    if (!user) {
      throw new NotFound("未找到该用户")
    }
  }
  static async verifyEmailPassword(email, password) {
    const user = await User.findOne({
      where:{
        email
      }
    })
    if (!user) {
      throw new NotFound('未找到该用户')
    }
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new AuthFailed("密码错误")
    }
    await Visit.addOneVisit(user.id)
    return user
  }

} //用于放入关于User的逻辑}
User.init({
  id: { //主键不能为空
    //自动增长 最好不用字符串做主键 性能问题.
    type: Sequelize.INTEGER,
    primaryKey: true, //设置主键 关系型数据库中重要的概念
    autoIncrement: true, //自动增长
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    set(val) {
      //  加密
      const salt = bcrypt.genSaltSync(10) //10 指生成这个盐的成本
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
}, {
  sequelize,
  tableName: "user"
})
module.exports = {
  User
}