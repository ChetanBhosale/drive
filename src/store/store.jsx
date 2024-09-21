import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice/authSlice";
import workflowSlice from "./slice/workflowSlice";
import { workflowApi } from "./api/workflowApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [workflowApi.reducerPath] : workflowApi.reducer,
        auth: authSlice,
        workflow : workflowSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(workflowApi.middleware)
});
