import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    workflows : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getWorkflow : (state,action) =>{
            state.workflows = action.payload
        },
    },
});

export const { getWorkflow } = authSlice.actions;
export default authSlice.reducer;
