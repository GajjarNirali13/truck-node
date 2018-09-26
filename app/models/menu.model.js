var mongoose = require('mongoose');

var MenuSchema = mongoose.Schema({
    truckId: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
    menu: [mongoose.Schema.Types.Mixed],
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Menu', MenuSchema);