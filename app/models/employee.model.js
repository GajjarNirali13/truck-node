var mongoose = require('mongoose');

var EmployeeSchema = mongoose.Schema({
    name: String,
    email: String,
    userName: String,
    passWord: String,
    phoneNumber: String,
    address: String,
    type: String,
    truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);