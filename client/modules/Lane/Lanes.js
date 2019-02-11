import React from 'react';
import PropTypes from 'prop-types';
import Lane from './LaneContainer';

import styles from './Lanes.css';

const Lanes = ({ lanes, createLane }) => {
  return (
    <div className={styles.Lanes}>
      <button
        className={styles.AddLane}
        onClick={() => createLane({
          name: 'New lane',
        })}
      >+</button>
      {lanes.map(lane => <Lane key={lane.id} lane={lane} />)}
    </div>
  );
}

Lanes.propTypes = {
  lanes: PropTypes.array,
}

export default Lanes;
