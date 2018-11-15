import { GET_GROUP_ID, SET_GROUP_ID } from '../constants';

export const getGroupId = () => dispatch => {
  dispatch({
    type: GET_GROUP_ID,
    payload: "hej"
  })
}

export const setGroupId = groupId => dispatch => {
  dispatch({
    type: SET_GROUP_ID,
    payload: groupId
  })
}