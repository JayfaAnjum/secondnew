import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({

    name:"auth",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:null,
        error:null,
        success:null,
    },

    reducers:{

        loginRequest(state,action){

            return{
                ...state,//it is used to get already assigned variable without change 
                loading:true,
                
            }
        },

        loginSuccess(state,action){

            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload.user
            }
        },

        loginFail(state,action){
            return{

                ...state,
                loading:false,
                error:action.payload
            }
        },

        registerRequest(state,action){
            return{

                ...state,
                loading:true
            }
        },
        registerSuccess(state,action){
            return{

                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user,

            }
        },
        registerFail(state,action){
            return{

                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        },
         loadUserRequest(state,action){
            return{

                ...state,

                loading:true
            }
        },
        loadUserSuccess(state,action){
            return{

                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload.user,
           
            }
        },
        loadUserFail(state,action){
            return{

                ...state,
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }
        },
        
        logoutSuccess(state,action){
            return{

                ...state,
                loading:false,
                isAuthenticated:false,
                
           
            }
        },
        logoutFail(state,action){
            return{

                ...state,
               
               error:action.payload
            }
        },

        loadProfile(state,action){
            return {

                ...state,
                error:action.payload,
            }

        },

        sucessProfile(state,action){

            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                success:true,
                user:action.payload,
               

            }
        },

        failProfile(state,action){

            return{
                ...state,
                isAuthenticated:true,
                error:action.payload,
sucess:false
            
            }

        }






    }
})


export const { loginRequest, loginSuccess, loginFail,registerFail,registerSuccess,registerRequest,loadUserRequest,loadUserSuccess ,loadUserFail,
    logoutSuccess,logoutFail,loadProfile,sucessProfile,failProfile
} = authSlice.actions;
export default authSlice.reducer;