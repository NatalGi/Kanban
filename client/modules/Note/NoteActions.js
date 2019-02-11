import callApi from '../../util/apiCaller';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

// Export Actions
export function createNoteRequest(note, laneId) {
  return (dispatch) => {
    return callApi('notes', 'post', { note, laneId })
    .then(noteResp => {
      dispatch(createNote(noteResp, laneId));
    });
  }
}

export function createNote(note, laneId) {
  return {
    type: CREATE_NOTE,
    laneId,
    note,
  }
}

export function createNotes(notes) {
  return {
    type: CREATE_NOTES,
    notes,
  }
}

export function updateNoteRequest(note) {
  return (dispatch) => {
    return callApi('notes', 'put', { noteId: note.id, task: note.task })
    .then(() => {
      dispatch(updateNote(note));
    });
  }
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  }
}

export function editNote(noteId) {
  return {
    type: EDIT_NOTE,
    noteId,
  }
}

export function deleteNoteRequest(noteId, laneId) {
  return (dispatch) => {
    return callApi(`notes/${noteId}`, 'delete', { laneId })
    .then(() => {
      dispatch(deleteNote(noteId, laneId));
    });
  }
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  }
}
