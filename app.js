//入口文件
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const worker_router = require('./routers/worker')
const index_router = require('./routers/index')
const session = require('express-session')
const port = 7000

const app = express()

app.use(express.static(path.join(__dirname,'public')))
app.use('/node_modules',express.static(path.join(__dirname,'/node_modules/')))

app.use(session({
    secret: 'keyboard woshishishi',
    resave: false,
    saveUninitialized: true 
}))

app.engine('html',require("express-art-template"))
app.set('views',path.join(__dirname,'./views/'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//加入路由
app.use('/',index_router)
app.use('/api',worker_router)

app.listen(port, () => {
    console.log("serve is running... click http://localhost:"+port)
})
