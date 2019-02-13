import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { compose } from 'redux';
import classNames from 'classnames';

// Import Style
import styles from './Note.css';
import { FiX } from "react-icons/fi";

class Note extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { hovered, connectDragSource, connectDropTarget, isDragging, editing, children } = this.props;
    const dragSource = editing ? a => a : connectDragSource;

    return dragSource(connectDropTarget(
      <li className={classNames(
        styles.Note,
        {[`${styles.NoteDragHover}`]: hovered},
        {[`${styles.NoteIsDragging}`]: isDragging}
      )}
        style={{
          opacity: isDragging ? 0 : 1
        }}
      >
        {children}
        <div className={styles.NoteDelete}>
          <button onClick={() => this.props.deleteNote(this.props.id, this.props.laneId)}><FiX /></button>
        </div>
      </li>
    ));
  }
}

const noteSource = {
  beginDrag(props) {
    return {
      id: props.id,
      laneId: props.laneId,
    };
  },
  isDragging(props, monitor) {
    return props.id === monitor.getItem().id;
  }
}

const noteTarget = {
  /*hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if(targetProps.id !== sourceProps.id) {
      targetProps.moveWithinLane(targetProps.laneId, targetProps.id, sourceProps.id);
    }
  },*/
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    targetProps.moveWithinLane(targetProps.laneId, targetProps.id, sourceProps.id);
  }
}

Note.propTypes = {
  children: PropTypes.any,
}

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  }))
)(Note);
