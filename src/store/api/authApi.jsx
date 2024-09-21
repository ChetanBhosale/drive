import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../slice/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Access-Control-Allow-Credentials', 'true');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem('token', result.data.results.token);
                    dispatch(userLogin(result.data.results));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        signupUser : builder.mutation({
            query: (data) => ({
                url: 'sign-up',
                method: 'POST',
                body: data,
            }),
        })
    }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;
