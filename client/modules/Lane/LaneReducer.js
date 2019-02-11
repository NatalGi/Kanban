// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, EDIT_LANE, DELETE_LANE } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE } from '../Note/NoteActions';

// Initial State
const initialState = {};

const LaneReducer = (state = initialState, action) => {
  let newLane = {};
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };
    case EDIT_LANE:
      const lane = { ...state[action.laneId], editing: true };
      return { ...state, [action.laneId]: lane };
    case CREATE_LANES:
      return { ...action.lanes };
    case DELETE_LANE:
      let newState = { ...state };
      delete newState[action.laneId];
      return newState;
    case CREATE_NOTE:
      newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.concat(action.note.id);
      return { ...state, [action.laneId]: newLane };
    case DELETE_NOTE:
      newLane = { ...state[action.laneId] };
      newLane.notes = newLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.laneId]: newLane };
    default:
      return state;
  }
};

export default LaneReducer;
