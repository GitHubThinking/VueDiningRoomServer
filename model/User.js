var mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)
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
    orders:{
        type:Array,
        default:[]
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

var findOne = (username,password)=>{
    console.log(username)
    console.log(password)
    return UserModel.findOne({
        username,
        password
    })
}

module.exports = {
    save,
    findOne
}