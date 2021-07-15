import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from './types';

//let unidad="https://localhost";
//let unidad="https://adryan2.sytes.net:5000";

let unidad="https://apisfsystem.herokuapp.com";


// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get(unidad+'/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    );
};

// Get profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get(unidad+'/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {},
      })
    );
};

// Get profile by id
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(unidad+`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post(unidad+'/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post(unidad+'/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post(unidad+'/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Delete experience
export const deleteExperience = (id) => dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(unidad+`/api/profile/experience/${id}`)
      .then(res => 
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Delete education
export const deleteEducation = (id) => dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(unidad+`/api/profile/education/${id}`)
      .then(res => 
        dispatch({
          type: GET_PROFILE,
          payload: res.data,
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Delet account & profile
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete(unidad+'/api/profile')
      .then(res => 
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        })
      ).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
};
