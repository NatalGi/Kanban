/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import intl from './modules/Intl/IntlReducer';
import lanes from './modules/Lane/LaneReducer';
import notes from './modules/Note/NoteReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  lanes,
  notes,
  intl,
});
