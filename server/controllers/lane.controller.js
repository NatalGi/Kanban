import Lane from '../models/lane';
import Note from '../models/note';
import cuid from 'cuid';

export function getSomething(req, res) {
  return res.status(200).end();
}

export function addLane(req, res) {
  if(!req.body.name) {
    return res.status(403).end();
  }

  const newLane = new Lane(req.body);
  newLane.notes = [];
  newLane.id = cuid();

  newLane.save((err, saved) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if(err) {
      res.status(500).send(err);
    }
    lane.notes.forEach(note => {
      Note.findOne({ id: note.id }).exec((err, note) => {
        if(err) {
          console.log(`Can't find note indexed as ${note.id}`);
        } else {
          note.remove();
        }
      });
    });
    lane.remove(() => {
      res.status(200).end();
    });
  });
}

export function updateLane(req, res) {
  const { id: laneId, name: newName } = req.body;
  if(!laneId || !newName) {
    res.status(400).end();
  }

  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if(err) {
      res.status(500).send(err);
    }
    lane.set({ name: newName });
    lane.save();
    return res.json(lane);
  });
}

export function moveNotesWithinLane(req, res) {
  const { laneId, targetId: targetNoteId, sourceId: sourceNoteId } = req.body;
  if(!laneId || !targetNoteId || !sourceNoteId) {
    res.status(400).end();
  }

  Lane.findOne({ id: laneId }).exec((err, lane) => {
    if(err) {
      res.status(500).send(err);
    }
    const newNotes = lane.notes;
    Note.findOne({ id: sourceNoteId }).exec((err, sourceNote) => {
      if(err) {
        res.status(500).send(err);
      }
      Note.findOne({ id: targetNoteId }).exec((err, targetNote) => {
        if(err) {
          res.status(500).send(err);
        }
        let sourceIndex = null;
        newNotes.some((note, index) => {
          if(note.id === sourceNote.id) {
            sourceIndex = index;
            return true;
          }
        });
        let targetIndex = null;
        newNotes.some((note, index) => {
          if(note.id === targetNote.id) {
            targetIndex = index;
            return true;
          }
        });
        newNotes.splice(targetIndex, 0, newNotes.splice(sourceIndex, 1)[0]);
        lane.update({$set: { notes: newNotes }});
        lane.save();
        res.status(200).end();
      });
    });
  });
}

export function moveNoteBetweenLanes(req, res) {
  const { targetLaneId, noteId, sourceLaneId } = req.body;
  if(!targetLaneId || !noteId || !sourceLaneId) {
    res.status(400).end();
  }

  Note.findOne({ id: noteId }).exec((err, note) => {
    if(err) {
      res.status(500).send(err);
    }

    Lane.findOne({ id: targetLaneId }).exec((err, targetLane) => {
      if(err) {
        res.status(500).send(err);
      }
      Lane.findOne({ id: sourceLaneId }).exec((err, sourceLane) => {
        if(err) {
          res.status(500).send(err);
        }

        targetLane.notes.push(note);
        sourceLane.notes.pull(note);
        targetLane.save();
        sourceLane.save();
        res.status(200).end();
      });
    });
  });
}
