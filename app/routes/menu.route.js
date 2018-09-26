var menuModel = require('../models/menu.model');

module.exports = function(app) {
    app.post('/api/menu', createMenu);
    app.get('/api/menu/:truckId', findMenu);
    app.put("/api/menu/:truckId", updateMenu);

    function createMenu (req, res) {
        if(!req.body.menu) {
            return res.status(400).send({message: "Please enter data"});
        }
        
        menuModel.find({truckId: req.params.truckId}, function(err, menu) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "menu not found with id " + req.params.truckId});                
                }
                return res.status(500).send({message: "Error retrieving menu with id " + req.params.truckId});
            } 
    
            if(!menu) {
                return res.status(404).send({message: "menu not found with id " + req.params.truckId});            
            }
            console.log(menu)
            res.send(menu);
        })

        
        // var menu = new menuModel({
        //     menu: req.body.menu,
        //     truckId: req.body.truckId
        // });

        // menu.save(function(error, result){
        //     if (error) {
        //         res.status(500).send({message: "Sorry! Something went wrong."});
        //     } else {
        //         res.send(result);
        //     }
        // })
    }

    function findMenu (req, res) {
        if (!req.params.truckId) {
            return res.status(404).send({message: "Invalid menu ID."});            
        }

        menuModel.find({truckId: req.params.truckId}, function(err, menu) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "menu not found with id " + req.params.truckId});                
                }
                return res.status(500).send({message: "Error retrieving menu with id " + req.params.truckId});
            } 
    
            if(!menu) {
                return res.status(404).send({message: "menu not found with id " + req.params.truckId});            
            }
    
            res.send(menu);
        });
    }

    function updateMenu (req, res) {
        if (!req.params.truckId) {
            return res.status(404).send({message: "Invalid menu ID."});            
        }
        
        noteModel.update({ _id: req.params.truckId }, req.body, function(error, result) {
            if(error) {
                res.status(500).send({message: "Could not update menu with id " + req.params.menuId});
            } else {
                res.send(result);
            }
        });
    }
}