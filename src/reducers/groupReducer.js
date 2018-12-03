import { GET_GROUP_ID, SET_GROUP_ID, ADD_TASK } from '../constants';

const initialState = {
  groupId: "",
  task: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUP_ID:
      return {
        ...state
      }
    case SET_GROUP_ID:
      return {
        ...state,
        groupId: action.payload
      }
    case ADD_TASK:
      return {
        ...state,
        task: action.payload
      }
    default:
      return state;
  }
}