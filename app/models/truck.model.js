var mongoose = require('mongoose');

var TruckSchema = mongoose.Schema({
    truckName: String,
    truckNo: String,
    truckPhNo: String,
    truckEmail: String,
    truckLocation: { address: String, lat: String, long: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Truck', TruckSchema);