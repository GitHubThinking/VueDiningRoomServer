var UserModel = require('../model/User.js')

var register = async (req, res, err) => {
    var {
        username,
        password,
        realname
    } = req.body

    var result = await UserModel.save({
        username,
        password,
        realname
    })
    if (result) {
        res.send({
            msg: 'register success',
            state: 0
        })
    } else {
        res.send({
            msg: 'register failure',
            state: -1
        })
    }

}

var login = async (req, res, err) => {
    var {
        username,
        password
    } = req.body
    var result = await UserModel.findOne({
        username,
        password
    });
    // console.log(result.username)

    if (result) {
        req.session.username = result.username;
        req.session.realname = result.realname;
        req.session.money = result.money
        res.send({
            msg: 'login success',
            state: 0
        })
    } else {
        res.send({
            msg: 'login failure',
            state: -1
        })
    }


}

var logout = async (req, res, err) => {
    req.session.username = ''
    req.session.realname = ''
    req.session.money = 0
    res.send({
        msg: 'logout success',
        state: 0
    });
}

var getuser = async (req, res, err) => {
    console.log(req.session.username)
    if (req.session.username) {
        res.send({
            msg: '用户已经登陆',
            state: 0,
            data: {
                username: req.session.username,
                realname: req.session.realname,
                money: req.session.money
            }
        });
    } else {
        res.send({
            msg: '该用户不存在，请重新登陆',
            state: -1
        })
    }
}

/*
    以下为功能函数
*/
// 充值
var recharge = async (req, res, err) => {
    var {
        username,
        rechargemoney
    } = req.body

    var user = await UserModel.findOne({
        username
    })
    var newmoney = user.money + rechargemoney
    // console.log('newmoney'+newmoney)
    var result = await UserModel.recharge(user.username, newmoney)
    // console.log('result.money'+result.money)
    if (result) {
        req.session.money = newmoney
        res.send({
            msg: '充值成功',
            state: 0,
            data: {
                money: newmoney
            }
        });
    } else {
        res.send({
            msg: '充值失败',
            state: -1
        });
    }
}

// 消费
var consume = async (req,res,arr) => {
    var {
        username,
        paymoney
    } = req.body

    var user = await UserModel.findOne({
        username
    })
    var newmoney = user.money - paymoney
    if(newmoney < 0){
        res.send({
            msg: '对不起，余额不足！',
            state: -2
        });
        return ;
    }

    var result = await UserModel.recharge(user.username, newmoney)
    if (result) {
        req.session.money = newmoney
        res.send({
            msg: '消费成功',
            state: 0,
            data: {
                money: newmoney
            }
        });
    } else {
        res.send({
            msg: '消费失败',
            state: -1
        });
    }
}

module.exports = {
    login,
    logout,
    register,
    getuser,
    recharge,
    consume
}