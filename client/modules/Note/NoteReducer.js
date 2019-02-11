// Import Actions
import { CREATE_NOTE, UPDATE_NOTE, EDIT_NOTE, DELETE_NOTE, CREATE_NOTES } from './NoteActions';

// Initial State
const initialState = {};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE:
      return { ...state, [action.note.id]: action.note };
    case EDIT_NOTE:
      const note = { ...state[action.noteId], editing: true };
      return { ...state, [action.noteId]: note };
    case DELETE_NOTE:
      let newState = { ...state };
      delete newState[action.noteId];
      return newState;
    case CREATE_NOTES:
      return { ...action.notes };
    default:
      return state;
  }
};

export default NoteReducer;
