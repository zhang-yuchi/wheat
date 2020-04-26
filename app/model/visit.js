//记录登录人数
const {
  sequelize
} = require('../../core/db')
const {
  Sequelize,
  Model
} = require('sequelize')
class Visit extends Model {
  static async addOneVisit(id){
    await Visit.create({
      uid:id
    })
  }
}
Visit.init({
  uid:Sequelize.INTEGER
},{
  sequelize,
  tableName:"visit"
})
module.exports = {
  Visit
}