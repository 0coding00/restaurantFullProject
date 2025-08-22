import { createSlice } from "@reduxjs/toolkit";
const uiSlice=createSlice({
    name:'ui',
    initialState:{cartIsOpen:false,message:'', token: localStorage.getItem("token") || null},
    reducers:{
        toggle(state){
            state.cartIsOpen=!state.cartIsOpen;
        },
        notify(state,action){
            const newNote=action.payload;
            state.message=newNote;
        },
        setIsUser(state){
            state.token=localStorage.getItem('token');
        }
    }
})
export const uiAction=uiSlice.actions;
export default uiSlice;