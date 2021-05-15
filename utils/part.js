//封装对组件的操作
const {Part} = require('../models')
const PartUtil = {}

/**
 * 获取所有组件对象
 * @returns Promise对象
 */
PartUtil.getAll = async () => {
    try {
        return await Part.find()
    } catch (error) {
        return error
    }
}

/**
 * 插入一条组件数据
 * @param {Object} data 
 */
PartUtil.addOne = async (data) => {
    try {
        return await new Part(data).save()
    } catch (error) {
        return error
    }
}

module.exports = PartUtil