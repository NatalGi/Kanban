import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as laneActions from './LaneActions';
import { createNoteRequest, deleteNote } from '../Note/NoteActions';

import Lane from './Lane';

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: Object.values(ownProps.lane.notes).map(noteId => Object.values(state.notes).find(note => note.id === noteId)),
  };
};

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  updateLane: laneActions.updateLaneRequest,
  deleteLane: laneActions.deleteLaneRequest,
  deleteNote,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lane);
