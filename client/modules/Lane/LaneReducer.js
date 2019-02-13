// Import Actions
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, EDIT_LANE, DELETE_LANE, MOVE_BETWEEN_LANES } from './LaneActions';
import { CREATE_NOTE, DELETE_NOTE, MOVE_WITHIN_LANE } from '../Note/NoteActions';

function moveNotes(array, sourceNoteId, targetNoteId) {
  const sourceIndex = array.indexOf(sourceNoteId);
  const targetIndex = array.indexOf(targetNoteId);
  const arrayCopy = [ ...array ];

  arrayCopy.splice(targetIndex, 0, arrayCopy.splice(sourceIndex, 1)[0]);
  return arrayCopy;
}

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
    case MOVE_WITHIN_LANE:
      newLane = { ...state[action.laneId] };
      newLane.notes = moveNotes(newLane.notes, action.sourceId, action.targetId);
      return { ...state, [action.laneId]: newLane };
    case MOVE_BETWEEN_LANES:
      const targetLane = { ...state[action.targetLaneId] };
      targetLane.notes = [...targetLane.notes, action.noteId];
      const sourceLane = { ...state[action.sourceLaneId] };
      sourceLane.notes = sourceLane.notes.filter(noteId => noteId !== action.noteId);
      return { ...state, [action.targetLaneId]: targetLane, [action.sourceLaneId]: sourceLane };
    default:
      return state;
  }
};

export default LaneReducer;
