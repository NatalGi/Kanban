import { connect } from 'react-redux';
import { compose } from 'redux';
import * as laneActions from './LaneActions';
import { createNoteRequest, deleteNote } from '../Note/NoteActions';

import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

import Lane from './Lane';
let i = 0;

const mapStateToProps = (state, ownProps) => {
  return {
    laneNotes: Object.values(ownProps.lane.notes).map(noteId => Object.values(state.notes).find(note => note.id === noteId)),
  };
};

const noteTarget = {
  /*hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    targetProps.moveBetweenLanes(targetProps.lane.id, noteId, sourceLaneId);
  },*/
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const { id: noteId, laneId: sourceLaneId } = sourceProps;
    if(sourceLaneId !== targetProps.lane.id) {
      targetProps.moveBetweenLanes(targetProps.lane.id, noteId, sourceLaneId);
    }
  }
}

const mapDispatchToProps = {
  ...laneActions,
  addNote: createNoteRequest,
  updateLane: laneActions.updateLaneRequest,
  deleteLane: laneActions.deleteLaneRequest,
  moveBetweenLanes: laneActions.moveBetweenLanesRequest,
  deleteNote,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.NOTE, noteTarget, (dragConnect) => ({
    connectDropTarget: dragConnect.dropTarget()
  }))
)(Lane);
