var truckModel = require('../models/truck.model');
module.exports = function(app) {
    app.post('/api/truck', createTruck);
    app.get('/api/trucks', findTrucks);
    app.get('/api/truck/:truckId', findTruckById);
    app.put("/api/truck/:truckId", updateTruckById);
    app.delete("/api/truck/:truckId", deleteTruckById);

    function createTruck (req, res) {
        if(!req.body.truckName) {
            return res.status(400).send({message: "Please enter data"});
        }

        var truck = new truckModel({
            truckName: req.body.truckName,
            truckNo: req.body.truckNo,
            truckPhNo: req.body.truckPhNo,
            truckEmail: req.body.truckEmail
        });

        truck.save(function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        })
    }

    function findTrucks (req, res) {
        var type = req.params.type;

        truckModel.find({}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        });
    }

    function findTruckById (req, res) {
        if (!req.params.truckId) {
            return res.status(404).send({message: "Invalid user ID."});            
        }

        truckModel.findById(req.params.truckId, function(err, truck) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "truck not found with id " + req.params.truckId});                
                }
                return res.status(500).send({message: "Error retrieving truck with id " + req.params.truckId});
            } 
    
            if(!truck) {
                return res.status(404).send({message: "truck not found with id " + req.params.truckId});            
            }
    
            res.send(truck);
        });
    }

    function updateTruckById (req, res) {
        if (!req.params.truckId) {
            return res.status(404).send({message: "Invalid truck ID."});            
        }
        
        truckModel.update({ _id: req.params.truckId }, req.body, function(error, result) {
            if(error) {
                res.status(500).send({message: "Could not update truck with id " + req.params.truckId});
            } else {
                res.send(result);
            }
        });
    }

    function deleteTruckById (req, res) {
        truckModel.findByIdAndRemove(req.params.truckId, function(err, truck) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "truck not found with id " + req.params.truckId});                
                }
                return res.status(500).send({message: "Could not delete truck with id " + req.params.truckId});
            }
    
            if(!truck) {
                return res.status(404).send({message: "truck not found with id " + req.params.truckId});
            }
    
            res.send({message: "User deleted successfully!"})
        });
    }
}