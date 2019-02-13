import React from 'react';
import PropTypes from 'prop-types';
import Notes from '../Note/NotesContainer';
import Edit from '../../components/Edit';

// Import Style
import styles from './Lane.css';
import { FiX } from "react-icons/fi";

const Lane = props => {
  const {connectDropTarget, lane, laneNotes, updateLane, editLane, deleteLane, addNote } = props;
  const laneId = lane.id;

  return connectDropTarget(
    <div className={styles.Lane}>
      <div className={styles.LaneHeader}>
        <Edit
          className={styles.LaneName}
          editing={lane.editing ? lane.editing : false}
          value={lane.name}
          onValueClick={() => editLane(laneId)}
          onUpdate={name => updateLane({ ...lane, name, editing: false })}
        />
        <div className={styles.LaneDelete}>
          <button onClick={() => deleteLane(laneId)}><FiX /></button>
        </div>
      </div>
      <Notes
        notes={laneNotes}
        laneId={laneId}
        addNote={addNote}
      />
    </div>
  );
}

/*

 */

Lane.propTypes = {
  connectDropTarget: PropTypes.func,
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  updateLane: PropTypes.func,
  editLane: PropTypes.func,
  deleteLane: PropTypes.func,
  addNote: PropTypes.func,
};

export default Lane;
