var userModel = require('../models/user.model');

module.exports = function(app) {
    app.post('/api/user', createUser);
    app.get('/api/users', findUsers);
    app.get('/api/user/:userId', findUserById);
    app.put("/api/user/:userId", updateUserById);
    app.delete("/api/user/:userId", deleteUserById);
    app.post("/api/user/authenticate", authenticateUser);

    function createUser (req, res) {
        if(!req.body.name) {
            return res.status(400).send({message: "Please enter data"});
        }
        var user = new userModel({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            passWord: req.body.passWord,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });
        user.save(function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        })
    }

    function findUsers (req, res) {
        userModel.find({}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        });
    }

    function findUserById (req, res) {
        if (!req.params.userId) {
            return res.status(404).send({message: "Invalid user ID."});            
        }
        userModel.findById(req.params.userId, function(err, user) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "user not found with id " + req.params.userId});                
                }
                return res.status(500).send({message: "Error retrieving user with id " + req.params.userId});
            } 
            if(!user) {
                return res.status(404).send({message: "user not found with id " + req.params.userId});            
            }
            res.send(user);
        });
    }

    
    

    function updateUserById (req, res) {
        if (!req.params.userId) {
            return res.status(404).send({message: "Invalid user ID."});            
        }
        userModel.update({ _id: req.params.userId }, req.body, function(error, result) {
            if(error) {
                res.status(500).send({message: "Could not update user with id " + req.params.userId});
            } else {
                res.send(result);
            }
        });
    }
        

    function deleteUserById (req, res) {
        userModel.findByIdAndRemove(req.params.userId, function(err, user) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "user not found with id " + req.params.userId});                
                }
                return res.status(500).send({message: "Could not delete user with id " + req.params.userId});
            }
            if(!user) {
                return res.status(404).send({message: "user not found with id " + req.params.userId});
            }
            res.send({message: "user deleted successfully!"})
        });
    }
    
    

    function authenticateUser (req, res) {
        userModel.find({"userName": req.body.userName, "passWord": req.body.passWord}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                var sendData = {
                    "id": result[0]._id,
                    "name": result[0].name,
                    "email": result[0].email
                };
                res.send(sendData);
            }
        });
    }

}