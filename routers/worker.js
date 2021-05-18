const express = require('express')
const Admin = require('../utils/admin')
const Worker = require('../utils/worker')
const Part = require('../utils/part')
const Car = require('../utils/car')
const Order = require('../utils/order')
const router = express.Router()

//管理员登录
router.post('/admin/login', async (req, res) => {
    var body = req.body
    try {
        const result =  await Admin.login(body)
        if(result == null)return res.json({
            code:1,
            message:'用户名或者密码错误',
            data: null
        })
        //记录下该管理员为本人使用
        req.session.isAdmin = true
        req.session.isWorker = false
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
        
    } catch (error) {
        res.json({
            code:0,
            message:'服务器错误，请稍后重试',
            data: null
        })
    }
})

//请求所有员工数据
router.get('/admin/allworks', async (req, res) => {
    //验证该用户是否登录为管理员
    if(!req.session.isAdmin)
    return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    //是管理员则可以继续操作
    try {
        const result = await Worker.getAll()
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'服务器错误，请稍后重试',
            data: null
        })
    } 
})

//请求添加员工
router.post('/admin/addwork', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Worker.addOne(body)
        res.json({
            code:1,
            message:'添加成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'添加失败',
            data:null
        })
    }
})

//请求删除一名员工
router.post('/admin/delwork', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Worker.delOne(body)
        res.json({
            code:1,
            message:'删除成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'删除失败',
            data:null
        })
    }
})

//请求更新一名员工
router.post('/admin/upwork', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Worker.updOne(body)
        res.json({
            code:1,
            message:'更新成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'更新失败',
            data:null
        })
    }
})

//请求获取所有组件
router.get('/admin/allcarparts', async (req, res) => {
    //验证该用户是否登录为管理员或者职工
    if(!(req.session.isAdmin||req.session.isWorker))
    return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    //是管理员则可以继续操作
    try {
        const result = await Part.getAll()
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'服务器错误，请稍后重试',
            data: null
        })
    } 
})

//请求获取所有汽车
router.get('/admin/allcars', async (req, res) => {
    //验证该用户是否登录为管理员或者职工
    if(!(req.session.isAdmin||req.session.isWorker))
    return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    //是管理员则可以继续操作
    try {
        const result = await Car.getAll()
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'服务器错误，请稍后重试',
            data: null
        })
    } 
})

//请求添加汽车
router.post('/admin/inscar', async (req, res) => {
    if(!(req.session.isAdmin||req.session.isWorker))return res.json({
        code:0,
        message:'非本人操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Car.addOne(body)
        res.json({
            code:1,
            message:'添加成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'添加失败,请检查组件库存各组件数量是否足够',
            data:null
        })
    }
})

//请求获取订单
router.get('/admin/allorders', async (req, res) => {
    //验证该用户是否登录为管理员
    if(!req.session.isAdmin)
    return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    //是管理员则可以继续操作
    try {
        const result = await Order.getAll()
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'服务器错误，请稍后重试',
            data: null
        })
    } 
})

//请求确认订单
router.post('/admin/confirmorder', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Order.confirmOrder(body)
        res.json({
            code:1,
            message:'确认订单成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'确认订单失败,请检查库存是否足够',
            data:null
        })
    }
})

//请求删除订单
router.post('/admin/delorder', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Order.delOne(body)
        res.json({
            code:1,
            message:'删除订单成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'删除订单失败',
            data:null
        })
    }
})

//下面两条应该优化
//请求添加订单1
router.post('/admin/addcarorder', async (req, res) => {
    if(!req.session.isAdmin)return res.json({
        code:0,
        message:'非管理员操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Order.addMany(body)
        res.json({
            code:1,
            message:'添加汽车订单成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'添加组件订单失败',
            data:null
        })
    }
})
//请求添加订单2
router.post('/admin/addpartorder', async (req, res) => {
    if(!(req.session.isAdmin||req.session.isWorker))return res.json({
        code:0,
        message:'非本人操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Order.addMany(body)
        res.json({
            code:1,
            message:'添加汽车订单成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'添加组件订单失败',
            data:null
        })
    }
})
//职工登录
router.post('/worker/login', async (req,res) => {
    const body = req.body
    try {
        const result = await Worker.login(body)
        if(result == null)return res.json({
            code:1,
            message:'用户名或者密码错误',
            data: null
        })
        //记录下该用户为职工使用
        req.session.isWorker = true
        req.session.isAdmin = false
        res.json({
            code:1,
            message:'请求成功',
            data: result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'登录失败',
            data:null
        })
    }
})
//修改职工密码
router.post('/worker/updpwd',async(req,res) => {
    if(!req.session.isWorker)return res.json({
        code:0,
        message:'非本人操作',
        data:null
    })
    const body = req.body
    try {
        const result = await Worker.updPwd(body)
        res.json({
            code:1,
            message:'修改成功',
            data:result
        })
    } catch (error) {
        res.json({
            code:0,
            message:'修改失败',
            data:null
        })
    }
})

module.exports = router