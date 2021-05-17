//封装对汽车的操作
const {Car} = require('../models')
const PartUtil = require("../utils/part")
const CarUtil = {}

/**
 * 获取所有汽车对象
 * @returns Promise对象
 */
 CarUtil.getAll = async () => {
    try {
        return await Car.find()
    } catch (error) {
        throw error
    }
}

/**
 * 添加一条汽车数据
 * @param {Object} data 
 * @returns 
 */
CarUtil.addOne = async (data) => {
    try {
        //组装车辆消耗组件库存
        await PartUtil.queryStories()//如果组件库存不够会抛出异常
        return await new Car(data).save()
    } catch (error) {
        throw error
    }
}

module.exports = CarUtil