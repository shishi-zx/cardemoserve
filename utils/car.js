//封装对汽车的操作
const {Car} = require('../models')
const CarUtil = {}

/**
 * 获取所有汽车对象
 * @returns Promise对象
 */
 CarUtil.getAll = async () => {
    try {
        return await Car.find()
    } catch (error) {
        return error
    }
}

/**
 * 添加一条汽车数据
 * @param {Object} data 
 * @returns 
 */
CarUtil.addOne = async (data) => {
    try {
        return await new Car(data).save()
    } catch (error) {
        return error
    }
}

module.exports = CarUtil