//封装对员工的操作
const {Worker} = require('../models')
const WorkerUtil = {}

/**
 * 请求所有员工数据对象
 * @returns promise对象
 */
WorkerUtil.getAll = async () => {
    try {
        return await Worker.find()
    } catch (error) {
        return eooro
    }
}

/**
 * 添加员一名工
 * @param {Object} data 要添加的新员工对象
 * @returns promise对象
 */
WorkerUtil.addOne = async (data) => {
    try {
        return await new Worker(data).save()
    } catch (error) {
        return error
    }
}

/**
 * 删除一名员工
 * @param {Object} data 要删除的员工对象，必须包括id属性
 * @returns 
 */
WorkerUtil.delOne = async (data) => {
    try {
        return await Worker.deleteOne({id: data.id})
    } catch (error) {
        return error
    }
}

/**
 * 更新一名员工
 * @param {Object} data 要更新的员工对象，必须包括id属性
 * @returns 
 */
WorkerUtil.updOne = async (data) => {
    try {
        return await Worker.updateOne({id: data.id}, data)
    } catch (error) {
        return error
    }
}

module.exports = WorkerUtil