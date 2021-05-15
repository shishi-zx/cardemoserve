//封装admin相关的操作
const {Admin} = require('../models')

let AdminUtil = {}

/**
 * 请求登录管理员，查询成功返回管理员的数据，如果为空表示没有此数据，返回失败表示连接数据库出现问题
 * @param {Object} user 管理员对象
 * @returns Promise对象
 */
AdminUtil.login = async (user) => {
    try {
        return await Admin.findOne({
            admin: user.admin,
            password:user.password
        })
    } catch (error) {
        return error
    }
}

module.exports = AdminUtil
