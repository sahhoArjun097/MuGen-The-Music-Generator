import { createSlice } from "@reduxjs/toolkit";
const  authSlice = createSlice({
   name : "user",
   initialState :{
      // User: null,
      userData:JSON.parse(localStorage.getItem("userData")) || null
   },
   reducers:{
      addUser : (state,action)=>{
         // state.User = action.payload;
         state.userData = action.payload
         localStorage.setItem("userData",JSON.stringify(action.payload))
      },
      removeUser:(state)=>{
         state.userData = null
         localStorage.removeItem("userData")
      },
      deductToken: (state, action) => {
         if (state.userData && state.userData.user) {
           state.userData.user.token -= action.payload || 50;
           localStorage.setItem("userData", JSON.stringify(state.userData));
         }
       },
      addToken: (state, action) => {
         if (state.userData && state.userData.user) {
           state.userData.user.token += action.payload || 300;
           localStorage.setItem("userData", JSON.stringify(state.userData));
         }
       },

       addAudioSrc  : (state,action)=>{
         state.audioUrl = action.payload
         localStorage.setItem("audioSrc",action.payload)
       },
       removeAudioUrl : (state)=>{
         state.audioUrl = null
         localStorage.removeItem("audioSrc")
       }   
   }
})
export const { addUser, removeUser, deductToken ,addToken , addAudioSrc ,removeAudioUrl} = authSlice.actions
export default authSlice.reducer