import axios from 'axios';

import { loginRequest, loginSuccess, loginFail, registerRequest,registerFail,registerSuccess, loadUserRequest, loadUserSuccess, loadUserFail,logoutSuccess,logoutFail, failProfile, sucessProfile } from '../slice/authSlice';

export const login =(email,password) => async (dispatch)=>{

    try{
  dispatch(loginRequest());

        const {data}= await axios.post(`${import.meta.env.VITE_REACT_APP_URL1}/auth/login`,{email,password},{ withCredentials: true } );
        dispatch(loginSuccess(data));
    }
            
 
 catch (error) {

  const message =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message || "Something went wrong";

  dispatch(loginFail(message));
}
}


export const register =(userData) => async (dispatch)=>{

    try{
  dispatch(registerRequest());

        const {data}= await axios.post(`${import.meta.env.VITE_REACT_APP_URL1}/auth/register`,userData, { withCredentials: true });
        dispatch(registerSuccess(data));
    }
            
 
 catch (error) {
  
  const message =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message || "Something went wrong";

  dispatch(registerFail(message));
}
}



export const loadUser =() => async (dispatch)=>{

    try{
  dispatch(loadUserRequest());

        const {data}= await axios.get(`${import.meta.env.VITE_REACT_APP_URL1}/auth/myprofile`,{withCredentials: true});
        dispatch(loadUserSuccess(data));
    }
            
 
 catch (error) {

  const message =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message || "Something went wrong";

  dispatch(loadUserFail(message));
}
};



export const logout = () => async (dispatch) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_REACT_APP_URL1}/auth/logout`,
      {}, 
      { withCredentials: true } 
    );
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response?.data?.message || error.message));
  }
};

export const editProfile = (data) => async(dispatch) =>{

  try{

    const {data:data1}=await axios.put(`${import.meta.env.VITE_REACT_APP_URL1}/auth/update`,data,{withCredentials:true});
    dispatch(sucessProfile(data1.user));
  }
  catch(error){

     dispatch(failProfile(error.response?.data?.message || error.message));

  }
}