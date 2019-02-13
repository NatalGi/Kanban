import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Lanes from '../Lane/Lanes';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

// Import Style
import styles from './Kanban.css';

const Kanban = props => (
  <div className={styles.Board}>
    <Lanes lanes={props.lanes} createLane={props.createLane}/>
  </div>
);

Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = (state) => {
  return {
    lanes: Object.values(state.lanes),
  };
};

const mapDispatchToProps = {
  createLane: createLaneRequest,
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func,
};

export default compose(
connect(mapStateToProps, mapDispatchToProps),
DragDropContext(HTML5Backend)
)(Kanban);
