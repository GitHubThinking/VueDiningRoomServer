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
    var result = await UserModel.findOne(username, password);
    // console.log(result)
    if (result) {
        req.session.username = username;
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
    req.session.username = null
    res.send({
        msg: 'logout success',
        state: 0
    })
}

module.exports = {
    login,
    logout,
    register
}