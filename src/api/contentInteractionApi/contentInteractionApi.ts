import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { GetAllLikeRequestApiType, GetCountResponseApiType } from '../../types';

export const contentInteractionApi = createApi({
    reducerPath: 'contentInteractionApi',
    tagTypes: ['like', 'bookmart'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_CONTENT_INTERACTION_SERVICE_URL}/api/v1/`,
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
        getCount: build.query<GetCountResponseApiType, { postId: string }>({
            query: ({ postId }) => {
                return {
                    url: `/like/count?postId=${postId}`,
                };
            },
            providesTags: ['like'],
        }),

        getCountBooked: build.query<
            GetCountResponseApiType,
            { postId: string }
        >({
            query: ({ postId }) => {
                return {
                    url: `/bookmark/count?postId=${postId}`,
                };
            },
            providesTags: ['bookmart'],
        }),

        postLike: build.mutation<
            any,
            { postId: string; postType?: 'activity' | 'post' }
        >({
            query: ({ postId, postType = 'post' }) => {
                return {
                    url: `/like?postId=${postId}&postType=${postType}`,
                    method: 'POST',
                };
            },
        }),

        postBookmark: build.mutation<
            any,
            { postId: string; postType?: 'question' | 'post' | 'activity' }
        >({
            query: ({ postId, postType = 'post' }) => {
                return {
                    url: `/bookmark?postId=${postId}&postType=${postType}`,
                    method: 'POST',
                };
            },
        }),

        getUserLikedThisPost: build.query<any, { postId: string }>({
            query: ({ postId }) => {
                return {
                    url: `/like/user?postId=${postId}`,
                };
            },
            providesTags: ['like'],
        }),
        getUserBookmarkedThisPost: build.query<any, { postId: string }>({
            query: ({ postId }) => {
                return {
                    url: `/bookmark/user?postId=${postId}`,
                };
            },
            providesTags: ['bookmart'],
        }),

        deleteLike: build.mutation<any, { postId: string }>({
            query: ({ postId }) => {
                return {
                    url: `/like?postId=${postId}`,
                    method: 'DELETE',
                };
            },
        }),

        deleteBookmark: build.mutation<
            any,
            { postId: string; postType?: 'activity' | 'post' }
        >({
            query: ({ postId, postType = 'post' }) => {
                return {
                    url: `/bookmark?postId=${postId}`,
                    method: 'DELETE',
                };
            },
        }),
        getAllLike: build.query<GetAllLikeRequestApiType, void>({
            query: () => {
                return {
                    url: `/like`,
                };
            },
            providesTags: ['like'],
        }),
        getAllBookmark: build.query<GetAllLikeRequestApiType, void>({
            query: () => {
                return {
                    url: `/like`,
                };
            },
            providesTags: ['bookmart'],
        }),
    }),
});

export const {
    useGetCountQuery,
    useLazyGetCountQuery,
    usePostLikeMutation,
    useDeleteLikeMutation,
    useGetUserLikedThisPostQuery,
    useLazyGetUserLikedThisPostQuery,
    useGetAllLikeQuery,
    useLazyGetAllLikeQuery,
    useDeleteBookmarkMutation,
    useGetAllBookmarkQuery,
    useGetUserBookmarkedThisPostQuery,
    useLazyGetAllBookmarkQuery,
    useLazyGetUserBookmarkedThisPostQuery,
    usePostBookmarkMutation,
    useGetCountBookedQuery,
    useLazyGetCountBookedQuery,
} = contentInteractionApi;
