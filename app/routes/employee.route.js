var employeeModel = require('../models/employee.model');

module.exports = function(app) {
    app.post('/api/employee', createEmployee);
    app.get('/api/employees', findEmployees);
    app.get('/api/employee/:employeeId', findEmployeeById);
    app.put("/api/employee/:employeeId", updateEmployeeById);
    app.delete("/api/employee/:employeeId", deleteEmployeeById);
    app.post("/api/employee/authenticate", authenticateEmployee);

    function createEmployee (req, res) {
        if(!req.body.name) {
            return res.status(400).send({message: "Please enter data"});
        }

        var employee = new employeeModel({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            passWord: req.body.passWord,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            type: req.body.type,
            truckId: req.body.truckId
        });

        employee.save(function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        })
    }

    function findEmployees (req, res) {
        employeeModel.find({}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        });
    }

    function findEmployeeById (req, res) {
        if (!req.params.employeeId) {
            return res.status(404).send({message: "Invalid user ID."});            
        }

        employeeModel.findById(req.params.employeeId, function(err, employee) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "employee not found with id " + req.params.employeeId});                
                }
                return res.status(500).send({message: "Error retrieving employee with id " + req.params.employeeId});
            } 
    
            if(!employee) {
                return res.status(404).send({message: "employee not found with id " + req.params.employeeId});            
            }
    
            res.send(employee);
        });
    }

    function updateEmployeeById (req, res) {
        if (!req.params.employeeId) {
            return res.status(404).send({message: "Invalid employee ID."});            
        }
        
        noteModel.update({ _id: req.params.employeeId }, req.body, function(error, result) {
            if(error) {
                res.status(500).send({message: "Could not update employee with id " + req.params.employeeId});
            } else {
                res.send(result);
            }
        });
    }

    function deleteEmployeeById (req, res) {
        employeeModel.findByIdAndRemove(req.params.employeeId, function(err, employee) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "employee not found with id " + req.params.employeeId});                
                }
                return res.status(500).send({message: "Could not delete employee with id " + req.params.employeeId});
            }
    
            if(!employee) {
                return res.status(404).send({message: "employee not found with id " + req.params.employeeId});
            }
    
            res.send({message: "employee deleted successfully!"})
        });
    }

    function authenticateEmployee (req, res) {
        employeeModel.find({"userName": req.body.userName, "passWord": req.body.passWord}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                var sendData = {
                    "id": result[0]._id,
                    "name": result[0].name,
                    "email": result[0].email,
                    "type": result[0].type,
                    "truck" : result[0].truckId
                };
                res.send(sendData);
            }
        });
    }

}