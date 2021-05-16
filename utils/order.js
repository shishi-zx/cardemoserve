//封装对订单的操作
const {Order, Car} = require('../models')
const Part = require('../utils/part')
const OrderUtil = {}

/**
 * 获取所有订单对象
 * @returns Promise对象
 */
 OrderUtil.getAll = async () => {
    try {
        return await Order.find()
    } catch (error) {
        throw error
    }
}

/**
 * 修改订单的状态为已完成
 * @param {Object} data 
 * @returns 
 */
OrderUtil.confirmOrder = async (data) => {
    try {
        //先判断订单类型（是买进组件还是卖出汽车）
        let result = await Order.find({id: data.id})
        if(result[0].type == '买进组件'){
            //买进组件则添加组件库存
            let randomStr = () => {
                let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                let newstr = ''
                for(let i=0;i<6;i++){
                  newstr += str.charAt(Math.floor(Math.random()*26))
                }
                return newstr
            }
            let part = {
                type: result[0].good,
                price: result[0].price/result[0].goodNum,
                modelString: randomStr()
            }
            for(let i = 0; i<parseInt(result[0].goodNum); i++){
                await Part.addOne(part)
            }
            //更新订单的state字段
            let newOrder = await Order.updateOne({id: result[0].id},{state: '1'})
            return newOrder
        }
        else if(result[0].type == '卖出车辆'){
            //卖出车辆则减少车辆库存
            const nums = result[0].goodNum
            let carinfo = {
                type: result[0].good,
            }
            //先查询是否有足够库存可以支持卖出
            const stories = await Car.find(carinfo)
            if(parseInt(nums)>stories.length)
            {
                throw Error
            }
            else{
                for(let i=0;i<nums;i++)
                await Car.deleteOne(carinfo)
                let newOrder = await Order.updateOne({id: result[0].id},{state: '1'})
                return newOrder
            }
        }
    } catch (error) {
        throw error
    }
}

/**
 * 删除一条订单数据
 * @param {Object} data 
 * @returns 
 */
OrderUtil.delOne = async (data) => {
    try {
        return await Order.deleteOne({id: data.id})
    } catch (error) {
        throw error
    }
}

/**
 * 添加一堆订单数据
 * @param {Array} datas 
 * @returns 
 */
OrderUtil.addMany = async (datas) => {  
    try {
        datas.forEach( async (item) => {
            await new Order(item).save()
        })
        return {}
    } catch (error) {
        throw error
    }
}

module.exports = OrderUtil