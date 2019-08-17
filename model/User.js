var mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    realname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    money: {
        type: Number,
        default: 0
    }
});

var UserModel = mongoose.model('user', UserSchema)
UserModel.createIndexes()

var save = (data) => {
    var user = new UserModel(data)
    return user.save().then(() => {
        return true
    }).catch(() => {
        return false
    })

}

var findOne = (data) => {
    return UserModel.findOne(data)
}

// 充值
var recharge = (username, recharge) => {

    return UserModel.findOneAndUpdate({
        username
    },{
        money:recharge
    })

}

module.exports = {
    save,
    findOne,
    recharge
}