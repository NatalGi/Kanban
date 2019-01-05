import Note from '../models/note';
import Lane from '../models/lane';
import cuid from 'cuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function getNotes(req, res) {
  Note.find().exec((err, notes) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json({ notes });
  });
}

export function addNote(req, res) {
  const { note, laneId } = req.body;
  if(!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task
  });
  newNote.id = cuid();

  newNote.save((err, saved) => {
    if(err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if(err) {
      res.status(500).send(err);
    }
    note.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateNote(req, res) {
  const { noteId, newTask } = req.body;
  if(!noteId || !newTask) {
    res.status(400).end();
  }

  Note.findOne({ id: noteId }).exec((err, note) => {
    if(err) {
      res.status(500).send(err);
    }
    note.set({ task: newTask });
    note.save();
    return res.json(note);
  });
}
