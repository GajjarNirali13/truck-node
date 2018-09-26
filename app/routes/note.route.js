var noteModel = require('../models/note.model');
module.exports = function(app) {
    app.post('/api/note', createNote);
    app.get('/api/notes', findNotes);
    app.get('/api/note/:noteId', findNoteById);
    app.put("/api/note/:noteId", updateNoteById);
    app.delete("/api/note/:noteId", deleteNoteById);

    function createNote (req, res) {
        if(!req.body.content) {
            return res.status(400).send({message: "Note can not be empty"});
        }

        var note = new noteModel({
            title: req.body.title || "Untitled Note", 
            content: req.body.content
        });

        note.save(function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                res.send(result);
            }
        })
    }

    function findNotes (req, res) {
        noteModel.find({}, function(error, result){
            if (error) {
                res.status(500).send({message: "Sorry! Something went wrong."});
            } else {
                // var notification = new Notification('Email received', {
                //     body: 'You have a total of 3 unread emails'
                //   });
                res.send(result);
            }
        });
    }

    function findNoteById (req, res) {
        if (!req.params.noteId) {
            return res.status(404).send({message: "Invalid Note ID."});            
        }

        noteModel.findById(req.params.noteId, function(err, note) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
                }
                return res.status(500).send({message: "Error retrieving note with id " + req.params.noteId});
            } 
    
            if(!note) {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});            
            }
    
            res.send(note);
        });
    }

    function updateNoteById (req, res) {
        if (!req.params.noteId) {
            return res.status(404).send({message: "Invalid Note ID."});            
        }
        
        noteModel.update({ _id: req.params.noteId }, req.body, function(error, result) {
            if(error) {
                res.status(500).send({message: "Could not update note with id " + req.params.noteId});
            } else {
                res.send(result);
            }
        });
    }

    function deleteNoteById (req, res) {
        noteModel.findByIdAndRemove(req.params.noteId, function(err, note) {
            if(err) {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({message: "Note not found with id " + req.params.noteId});                
                }
                return res.status(500).send({message: "Could not delete note with id " + req.params.noteId});
            }
    
            if(!note) {
                return res.status(404).send({message: "Note not found with id " + req.params.noteId});
            }
    
            res.send({message: "Note deleted successfully!"})
        });
    }
};