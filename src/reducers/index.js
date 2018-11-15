import { combineReducers } from 'redux';
import groupReducer from './groupReducer'

const rootReducer = combineReducers({
  groups: groupReducer,
})

export default rootReducer;