import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as noteActions from './NoteActions';

import Notes from './Notes';

const mapDispatchToProps = {
  ...noteActions,
  updateNote: noteActions.updateNoteRequest,
  deleteNote: noteActions.deleteNoteRequest,
};

export default connect(
  null,
  mapDispatchToProps
)(Notes);
