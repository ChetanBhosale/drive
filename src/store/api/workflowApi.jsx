import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getWorkflow } from "../slice/workflowSlice";

const BASE_URL = import.meta.env.VITE_API_URL;

export const workflowApi = createApi({
    reducerPath: 'workflowApi',
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
        createWorkflow: builder.mutation({
            query: (data) => ({
                url: 'workflow',
                method: 'POST',
                body: data,
            }),
        }),
        getWorkflow : builder.query({
            query : () => ({
                url : 'workflow',
                method : "GET"
            }),
            async onQueryStarted(_args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // dispatch(userLogin(result.data.results));
                    dispatch(getWorkflow(result.data.results))
                } catch (error) {
                    console.log(error);
                }
            },
        })
        
    }),
});

export const { useCreateWorkflowMutation,useGetWorkflowQuery } = workflowApi;
