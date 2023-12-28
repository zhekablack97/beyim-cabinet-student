import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { GetHintResponseApiType } from '../../types';

export const assessmentServiceApi = createApi({
    reducerPath: 'assessmentServiceApi',
    tagTypes: ['Hint'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_ASSESSMENT_SERVICE_URL}/api/v1/`,
        prepareHeaders: headers => {
            const token = Cookies.get('access_token');
            const id_token = Cookies.get('id_token');

            // If we have a token set in state, let's assume that we should be passing it.
            if (token && id_token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('X-Api-Key', id_token);
            }

            headers.set('Access-Control-Allow-Headers', 'Authorization');
            return headers;
        },
    }),
    endpoints: build => ({
        getHint: build.query<
            GetHintResponseApiType,
            {
                offset: number;
                id: string;
            }
        >({
            query: ({ offset, id }) => {
                return {
                    url: `/questions/${id}/hint?offset=${offset}`,
                };
            },
        }),
    }),
});

export const { useGetHintQuery, useLazyGetHintQuery } = assessmentServiceApi;
