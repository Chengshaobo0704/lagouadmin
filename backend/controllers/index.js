const UsersModule = require('../module/index')
const { hash, compare } = require('../utils/tools')
const { remove } = require('../module/index')
const randomstring = require('randomstring')
    // const { compare } = require('bcryptjs')
    //注册用户
const signup = async(req, res, next) => {
    res.set('content-type', 'application/json;charset = utf-8')
    const { username, password } = req.body
    const bcryptPassword = await hash(password)
    let findResult = await UsersModule.findUser(username)

    if (findResult) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名已存在'
            })
        })
    } else {
        let result = await UsersModule.signup({
            username,
            password: bcryptPassword
        })

        res.render('success', {
            data: JSON.stringify({
                message: "注册成功"
            })
        })

    }
}

//登录
const signin = async(req, res, next) => {
    // res.set('content-type', 'application/json;charset = utf-8')
    const { username, password } = req.body
    let result = await UsersModule.findUser(username)
    if (result) {
        let { password: hash } = result
        let compareresult = await compare(password, hash)
        if (compareresult) {
            req.session.username = username
                // const sessionId = randomstring.generate()
                // res.set('Set-Cookie', `sessionId=${sessionId};Path:/;HttpOnly`)
            res.render('success', {
                data: JSON.stringify({
                    username
                })
            })


        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码错误'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码错误'
            })
        })
    }
}

const signout = async(req, res, next) => {
    req.session = null
    res.render('success', {
        data: JSON.stringify({
            message: '登出成功'
        })
    })


}

const isAuto = async(req, res, next) => {
    if (req.session.username) {
        res.render('success', {
            data: JSON.stringify({
                username: req.session.username
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '请登录'
            })
        })
    }
}

//获取用户列表
const list = async(req, res, next) => {
    res.set('content-type', 'application/json;charset = utf-8')
    const listResult = await UsersModule.findList()
    res.render('success', {
        data: JSON.stringify(listResult)
    })

}

//删除用户
const removes = async(req, res, next) => {
    res.set('content-type', 'application/json;charset = utf-8')


    const { id } = req.body
    let result = await remove(id)
    if (result) {
        res.render('success', {
            data: JSON.stringify({ message: '删除成功' })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({ message: '删除失败' })
        })
    }

}

exports.signup = signup
exports.list = list
exports.removes = removes
exports.signin = signin
exports.signout = signout
exports.isAuto = isAuto