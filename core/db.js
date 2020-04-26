const Sequelize = require('sequelize')
// const sequelize = new Sequlize(dbName,user,password,{
// })
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database
//创建sequlize实例
const obj = {
    dialect: 'mysql',
    host,
    port,
    logging: true, //打印查询过程
    timezone: "+08:00", //北京时间
    define: {
        //create_time  update_time delete_time 一条记录的创建时间 一条数据的更新时间/删除时间
        timestamps: true, //是否需要时间戳
        paranoid: true, //删除时间戳
        createAt: "created_at",
        updateAt: "updated_at",
        deletedAt: "deleted_at",
        underscored: true, //驼峰转换成下划线
        freezeTableName: true,
    },
}
const sequelize = new Sequelize(dbName, user, password, obj);

sequelize.authenticate().then(() => {
        console.log('database connect successfully');
    })
    .catch(() => {
        console.log('error');
    })
sequelize.sync({
    //不能随便加,只有开发时才能用
    force: false //加上之后会先删除表之后再加上这个表(重新造表)
}) //如果不加这句话不会自动创建到数据库
module.exports = {
    sequelize
}