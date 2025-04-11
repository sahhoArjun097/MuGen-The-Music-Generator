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
           state.userData.user.tokens -= action.payload || 50;
           localStorage.setItem("userData", JSON.stringify(state.userData));
         }
       }
   
   }
})
export const { addUser, removeUser, deductToken } = authSlice.actions
export default authSlice.reducer