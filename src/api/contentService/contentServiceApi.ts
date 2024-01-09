// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import {
    GetContentsResponseApiType,
    GetCustomFeedRequestApiType,
    GetLikesFeedResponseApiType,
    GetOneContentResponseApiType,
    GetOneResponseApiType,
    getContentsRequestApiType,
} from '../../types';

export const contentServiceApi = createApi({
    reducerPath: 'contentServiceApi',
    tagTypes: ['Subjects', 'likes', 'bookmart', 'feed'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_CONTENT_SERVICE_URL}/api/v1/`,
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
        getOne: build.query<GetOneContentResponseApiType, string>({
            query: id => `/content/${id}`,
        }),

        getOnePost: build.query<GetOneResponseApiType, string>({
            query: id => `/post/${id}`,
        }),

        getCustomFeed: build.query<
            GetCustomFeedRequestApiType,
            {
                microtopicIds: number[];
                include?: string[];
                locale?: 'kk' | 'ru' | 'en';
            }
        >({
            query: ({
                microtopicIds,
                locale = 'kk',
                include = ['image', 'video'],
            }) => {
                return {
                    url: `feed/custom?microtopicIds=${microtopicIds.join(
                        ',',
                    )}&locale=${locale}&include=${include.join(',')}`,
                };
            },
        }),

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

        getLikesFeed: build.query<
            GetLikesFeedResponseApiType,
            {
                include?: string[];
                locale?: 'ru' | 'kk' | 'en';
                page?: number;
                limit?: number;
                subjectIds?: number[];
            }
        >({
            query: ({
                locale = 'kk',
                include = ['image', 'video', 'activity'],
                page = 0,
                subjectIds = [],
                limit = 10,
            }) => {
                return {
                    url: `feed/likes?${limit ? `limit=${limit}` : ''}${
                        include.length < 1
                            ? ''
                            : `&include=${include.join(',')}`
                    }${page >= 0 ? `&offset=${page * limit}` : ''}${
                        subjectIds.length > 0
                            ? `&subjectIds=${subjectIds.join(',')}`
                            : ''
                    }`,
                };
            },
            providesTags: ['feed', 'likes'],
        }),

        getBookmarksFeed: build.query<
            GetLikesFeedResponseApiType,
            {
                include?: string[];
                locale?: 'ru' | 'kk' | 'en';
                page?: number;
                limit?: number;
                subjectIds?: number[];
            }
        >({
            query: ({
                locale = 'kk',
                include = ['image', 'video', 'activity'],
                page = 0,
                subjectIds = [],
                limit = 10,
            }) => {
                return {
                    url: `feed/bookmarks?${
                        page >= 0 ? `offset=${page * limit}` : ''
                    }${
                        include.length < 1
                            ? ''
                            : `&include=${include.join(',')}`
                    }${limit ? `&limit=${limit}` : ''}${
                        subjectIds.length > 0
                            ? `&subjectIds=${subjectIds.join(',')}`
                            : ''
                    }`,
                };
            },
            providesTags: ['feed', 'likes'],
        }),
    }),
});

export const {
    useGetFeedQuery,
    useLazyGetFeedQuery,
    useGetOneQuery,
    useLazyGetOneQuery,
    useGetOnePostQuery,
    useGetCustomFeedQuery,
    useLazyGetCustomFeedQuery,
    useLazyGetOnePostQuery,
    useGetBookmarksFeedQuery,
    useGetLikesFeedQuery,
    useLazyGetBookmarksFeedQuery,
    useLazyGetLikesFeedQuery,
} = contentServiceApi;
