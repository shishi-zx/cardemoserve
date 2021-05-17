//封装对员工的操作
const { data } = require('jquery')
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
        throw eooro
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
        throw error
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
        throw error
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
        throw error
    }
}

/**
 * 员工登录验证
 * @param {Object} worker 
 */
WorkerUtil.login = async (worker) => {
    try {
        const result = await Worker.findOne({name:worker.name,password:worker.password})
        if(result == null)throw Error
        return result
    } catch (error) {
        throw Error
    }
}

/**
 * 更新员工密码
 * @param {Object} worker 
 * @returns 
 */
WorkerUtil.updPwd = async (worker) => {
    try {
        const result = await Worker.updateOne({id: worker.id}, {password: worker.password})
        if(result == null)throw Error
        return result
    } catch (error) {
        throw error
    }
}
module.exports = WorkerUtil