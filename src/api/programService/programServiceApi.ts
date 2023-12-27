// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    GetFeedMicrotopicsResponseApiType,
    GetSearchGlobalResponseApiType,
    GetSectionBySubjectsApiResponseApiType,
    GetSectionsRequestApiType,
    GetSectionsResponseApiType,
    GetSubjectRequestApiType,
    GetSubjectResponseApiType,
} from '../../types';
import Cookies from 'js-cookie';

export const programServiceApi = createApi({
    reducerPath: 'programServiceApi',
    tagTypes: ['Subjects', 'Microtopics'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PROGRAMS_SERVICE_URL}/api/v1/`,
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
        getSearchGlobal: build.query<
            GetSearchGlobalResponseApiType,
            {
                input: string | string[];
                locale?: string;
                subjectIds?: number[];
            }
        >({
            query: ({ input, locale, subjectIds }) => {
                return {
                    url:
                        `global-search?q=${input}` +
                        (locale ? `&locale=${locale}` : '') +
                        (subjectIds ? `&subjectIds=${subjectIds}` : ''),
                };
            },
        }),
        getAllSubjects: build.query<
            GetSubjectResponseApiType,
            GetSubjectRequestApiType
        >({
            query: ({ program_id, page = 0, limit = 100 }) => {
                return {
                    url: `subjects?${limit ? `limit=${limit}` : ''}${
                        page ? `&offset=${page * limit}` : ''
                    }${program_id ? `&program_id=${program_id}` : ''}`,
                };
            },
            providesTags: ['Subjects'],
        }),
        getAllSections: build.query<
            GetSectionsResponseApiType,
            GetSectionsRequestApiType
        >({
            query: ({ subject_id, limit = 100, type_id, parent_id }) => {
                return {
                    url: `sections?${limit ? `limit=${limit}` : ''}${
                        subject_id ? `&subject_id=${subject_id}` : ''
                    }${type_id ? `&type_id=${type_id}` : ''}${
                        parent_id ? `&parent_id=${parent_id}` : ''
                    }`,
                };
            },
        }),
        getSectionsBySubject: build.query<
            GetSectionBySubjectsApiResponseApiType,
            { subject_id: string; limit: number }
        >({
            query: ({ subject_id, limit = 100 }) => {
                return {
                    url: `sections/sections-by-subject?limit=${limit}${
                        subject_id ? `&subject_id=${subject_id}` : ''
                    }`,
                };
            },
            providesTags: ['Subjects'],
        }),
        getFeedMicrotopics: build.query<
            GetFeedMicrotopicsResponseApiType,
            { limit: number; section_id: string }
        >({
            query: ({ limit = 100, section_id }) => {
                return {
                    url: `microtopics/feed-microtopics?limit=${limit}&section_id=${section_id}`,
                };
            },
            providesTags: ['Microtopics'],
        }),
    }),
});

export const {
    useGetSectionsBySubjectQuery,
    useLazyGetSectionsBySubjectQuery,
    useGetAllSubjectsQuery,
    useLazyGetAllSubjectsQuery,
    useGetAllSectionsQuery,
    useLazyGetSearchGlobalQuery,
    useGetSearchGlobalQuery,
    useGetFeedMicrotopicsQuery,
    useLazyGetFeedMicrotopicsQuery,
    useLazyGetAllSectionsQuery,
} = programServiceApi;
