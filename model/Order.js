var mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
var OrderSchema = new mongoose.Schema({
    diningroom: {
        type: String,
        default: "",
        required: true,
    },
    food: {
        type: Array,
        default: []
    },
    time: {
        type: Date,
        default: new Date(),
        required: true
    },
    totalprice: {
        type: Number,
        default: 0,
        required: true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

});

var OrderSchema = mongoose.model('order', OrderSchema)
OrderSchema.createIndexes()

var save = (data) => {
    var order = new OrderSchema(data)
    // console.log(order)
    return order.save().then(() => {
        return true
    }).catch(() => {
        return false
    })
}

var findorders = (data) => {
    return OrderSchema.find(data).sort({'_id':-1})
}   

// var findOne = (data) => {
//     return UserModel.findOne(data)
// }

// // 充值
// var recharge = (username, recharge) => {

//     return UserModel.findOneAndUpdate({
//         username
//     }, {
//         money: recharge
//     })

// }

module.exports = {
    save,
    findorders
}