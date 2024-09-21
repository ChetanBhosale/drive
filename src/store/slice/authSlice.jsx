import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        userLogout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;
