// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import {
    GetContentsResponseApiType,
    getContentsRequestApiType,
} from '../../types';

export const contentServiceApi = createApi({
    reducerPath: 'contentServiceApi',
    tagTypes: ['Subjects'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_CONTENT_SERVICE_URL}/api/v1/`,
        prepareHeaders: headers => {
            const token = Cookies.get('access__token');
            const id_token = Cookies.get('id_token');

            // If we have a token set in state, let's assume that we should be passing it.
            if (token && id_token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('X-Api-Key', id_token);
            }
            return headers;
        },
    }),

    endpoints: build => ({
        getFeed: build.query<
            GetContentsResponseApiType,
            getContentsRequestApiType
        >({
            query: ({
                limit = 1000,
                locale,
                subjectIds,
                microtopicIds,
                typeResources,
                page = 0,
            }) => {
                return {
                    url:
                        `feed?${limit ? `limit=${limit}` : ''}${
                            subjectIds ? `&subjectIds=${subjectIds}` : ''
                        }${
                            microtopicIds
                                ? `&microtopicIds=${microtopicIds}`
                                : ''
                        }${page >= 0 ? `&offset=${page * limit}` : ''}${
                            locale ? `&locale=${locale}` : ''
                        }` + (typeResources ? `&include=${typeResources}` : ''),
                };
            },
        }),
    }),
});

export const { useGetFeedQuery, useLazyGetFeedQuery } = contentServiceApi;