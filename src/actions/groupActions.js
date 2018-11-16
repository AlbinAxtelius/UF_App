import { GET_GROUP_ID, SET_GROUP_ID } from '../constants';

import store from '../../store'

export const getGroupId = () => dispatch => {
  dispatch({
    type: GET_GROUP_ID,
  })
}

export const setGroupId = groupId => dispatch => {
  dispatch({
    type: SET_GROUP_ID,
    payload: groupId
  })
}

export const addTask = taskData => dispatch => {
  
}