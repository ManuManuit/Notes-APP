const notesCtrl = {};
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req,res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title, description}); 
    await newNote.save();
    res.send('Create new note');
};

notesCtrl.renderNotes = (req, res) => {
    res.send('Render Notes');
}

notesCtrl.renderEditForm = (req, res) => {
    res.send('Render edit Form');
};

notesCtrl.updateNote = (req, res) => {
    res.send('Update notes');
};

notesCtrl.deleteNote = (req, res) => {
    res.send('Detele notes');
};

module.exports = notesCtrl;