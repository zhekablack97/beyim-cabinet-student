import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
    GetAllLikeRequestApiType,
    GetAnswerResponseApiType,
    GetCountResponseApiType,
    PostAnswersAssessmentRequestApiType,
    PostAnswersAssessmentResponseApiType,
    PostCheckAnswerResponseApiType,
    PostGetProgressResponseApiType,
    PostStartAssessmentRequestApiType,
    PostStartAssessmentResponseApiType,
} from '../../types';

export const beyimProgressApi = createApi({
    reducerPath: 'BeyimProgressApi',
    tagTypes: ['Progress'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PUBLIC_PROGRESS_URL}/api/v1/`,
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
        getAnswer: build.query<
            GetAnswerResponseApiType,
            {
                microtopicId?: number;
                sectionId?: number;
                microtopicIds?: number[];
            }
        >({
            query: ({ microtopicId, sectionId, microtopicIds }) => {
                return {
                    url: `/activities/answer?${
                        microtopicId
                            ? `microtopicId=${microtopicId}`
                            : 'microtopicId'
                    }${sectionId ? `&sectionId=${sectionId}` : ''}${
                        microtopicIds && microtopicIds.length > 0
                            ? `&microtopicIds=${microtopicIds.map(
                                  id => `${id}`,
                              )}`
                            : ''
                    }`,
                };
            },
            providesTags: ['Progress'],
        }),
        postStartAssessment: build.mutation<
            PostStartAssessmentResponseApiType,
            PostStartAssessmentRequestApiType
        >({
            query: body => {
                return {
                    url: '/assessments',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['Progress'],
        }),
        postAnswersAssessment: build.mutation<
            PostAnswersAssessmentResponseApiType,
            PostAnswersAssessmentRequestApiType
        >({
            query: body => {
                return {
                    url: `/assessments/${body.progress_id}/answers`,
                    method: 'POST',
                    body: {
                        answers: body.answers,
                    },
                };
            },
            invalidatesTags: ['Progress'],
        }),
        postToCompleteAssessment: build.mutation<any, { progress_id: number }>({
            query: ({ progress_id }) => {
                return {
                    url: `/assessments/${progress_id}/complete`,
                    method: 'POST',
                };
            },
            invalidatesTags: ['Progress'],
        }),
        postGetProgress: build.mutation<
            PostGetProgressResponseApiType,
            { progress_id: number }
        >({
            query: ({ progress_id }) => {
                return {
                    url: `/assessments/${progress_id}/progress`,
                    method: 'POST',
                };
            },
            invalidatesTags: ['Progress'],
        }),
        postCheckAnswer: build.mutation<
            PostCheckAnswerResponseApiType,
            {
                answer: number | number[];
                id: string;
            }
        >({
            query: body => {
                return {
                    url: `/activities/${body.id}/answer`,
                    method: 'POST',
                    body: {
                        answer: Number(body.answer),
                    },
                };
            },
            invalidatesTags: ['Progress'],
        }),
    }),
});

export const {
    useGetAnswerQuery,
    useLazyGetAnswerQuery,
    usePostCheckAnswerMutation,
    usePostAnswersAssessmentMutation,
    usePostToCompleteAssessmentMutation,
    usePostGetProgressMutation,
    usePostStartAssessmentMutation,
} = beyimProgressApi;
