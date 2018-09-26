var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    userName: String,
    passWord: String,
    phoneNumber: String,
    address: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);