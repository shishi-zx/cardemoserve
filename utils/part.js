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
        throw error
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
        throw error
    }
}

/**
 * 检查组件是否足够，如果足够则消耗一套组件
 */
PartUtil.queryStories = async () => {
    try {
        //检查是否每种组件都有库存
        const str = ['发动机配件','传动系配件','制动系配件','电器仪表系配件','汽车灯具','安全防盗','汽车外饰','影音电器','化工护理','车身及附件']
        for(let i = 0; i<str.length;i++){
            let result = await Part.find({type:str[i]})
            let num = result.length
            if(num<1)throw Error
        }
        //组件足够则消耗一套组件
        for(let i = 0; i<str.length;i++){
            let result = await Part.deleteOne({type:str[i]})
        }
        return null
    } catch (error) {
        throw Error
    }
}

module.exports = PartUtil