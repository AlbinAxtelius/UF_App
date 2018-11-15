import { GET_GROUP_ID, SET_GROUP_ID } from '../constants';

const initialState = {
  groupId: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GROUP_ID:
      return {
        ...state,
        groupId: action.payload
      }
    case SET_GROUP_ID:
      return {
        ...state,
        groupId: action.payload
      }
    default:
      return state;
  }
}