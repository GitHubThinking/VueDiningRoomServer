var OrderModel = require('../model/Order.js')
var mongoose = require('mongoose')

// 保存订单
var save = async (req, res, err) => {
    var {
        diningroom,
        food,
        time,
        totalprice,
        userid
    } = req.body
    // var userId = mongoose.Types.ObjectId("5d5612b2669aa336bca03ef7")
    // 5d5612b2669aa336bca03ef7
    console.log(userid)
    var result = await OrderModel.save({
        diningroom,
        food,
        time,
        totalprice,
        userid
    })

    if (result) {
        res.send({
            msg: "订单保存成功",
            state: 0
        })
    } else {
        res.send({
            msg: "订单保存失败",
            state: -1
        })
    }

}

// 根据用户列出所有订单
var findorders = async (req,res,err) => {
    var { userid } = req.body
    console.log(userid)
    userid = mongoose.Types.ObjectId(userid)
    var result = await OrderModel.findorders({
        userid
    })
    console.log(result)
    if (result) {
        res.send({
            msg: "订单查询成功",
            state: 0,
            data:{
                orderList:result
            }
        })
    } else {
        res.send({
            msg: "订单查询失败",
            state: -1
        })
    }
}

module.exports = {
    save,
    findorders
}