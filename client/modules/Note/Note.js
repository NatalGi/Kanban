import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './Note.css';
import { FiX } from "react-icons/fi";

const Note = props => (
  <li className={styles.Note}>
    {props.children}
    <div className={styles.NoteDelete}>
      <button onClick={() => props.deleteNote(props.id, props.laneId)}><FiX /></button>
    </div>
  </li>
);

Note.propTypes = {
  children: PropTypes.any,
}

export default Note;
