import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Edit.css';

export default class Edit extends Component {
  checkEnter = (e) => {
    if(e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value;

    if(value.trim().length === 0) {
      e.target.value = this.props.value;
    }

    if(this.props.onUpdate) {
      this.props.onUpdate(e.target.value.trim());
    }
  }

  renderValue = () => {
    const { value, onValueClick } = this.props;
    return (
      <div>
        <span className={styles.value} onClick={onValueClick}>{value}</span>
      </div>
    );
  }

  renderEdit = () => {
    return (
      <input
        className={styles.input}
        type="text"
        defaultValue=""
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        autoFocus
      />
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  value: PropTypes.string,
  onUpdate: PropTypes.func,
  onValueClick: PropTypes.func,
  editing: PropTypes.bool,
}
