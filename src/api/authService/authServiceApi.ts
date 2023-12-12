// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PostAuthRequestApiType, PostAuthResponseApiType } from '../../types';

// Define a service using a base URL and expected endpoints
export const authServiceApi = createApi({
    reducerPath: 'authServiceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_AUTH_SERVICE_URL}/api/v1/`,
    }),
    endpoints: builder => ({
        postLogin: builder.mutation<
            PostAuthResponseApiType,
            PostAuthRequestApiType
        >({
            query: body => ({
                url: `auth/login`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { usePostLoginMutation } = authServiceApi;
