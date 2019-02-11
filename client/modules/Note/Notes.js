import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';
import Edit from '../../components/Edit';

// Import Style
import styles from './Notes.css';

const Notes = ({ notes, laneId, addNote, editNote, updateNote, deleteNote }) => {
  return (
    <div className={styles.Notes}>
      <ul className="notes">
        {notes.map(note =>
          <Note id={note.id} laneId={laneId} key={note.id} deleteNote={deleteNote}>
            <Edit
              editing={note.editing}
              value={note.task}
              onValueClick={() => editNote(note.id)}
              onUpdate={(task) => updateNote({
                ...note,
                task,
                editing: false,
              })}
            />
          </Note>
        )}
      </ul>
      <div className={styles.AddNote}>
        <button onClick={() => addNote({ task: 'New note' }, laneId)}>+</button>
      </div>
    </div>
  );
}

Notes.propTypes = {
  notes: PropTypes.array,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  updateNote: PropTypes.func,
  deleteNote: PropTypes.func,
}

export default Notes;
