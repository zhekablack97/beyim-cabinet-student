// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    GetSectionsRequestApiType,
    GetSectionsResponseApiType,
    GetSubjectRequestApiType,
    GetSubjectResponseApiType,
} from '../../types';
import Cookies from 'js-cookie';

export const programServiceApi = createApi({
    reducerPath: 'programServiceApi',
    tagTypes: ['Subjects'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_PROGRAMS_SERVICE_URL}/api/v1/`,
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
    }),
});

export const {
    useGetAllSubjectsQuery,
    useLazyGetAllSubjectsQuery,
    useGetAllSectionsQuery,
    useLazyGetAllSectionsQuery,
} = programServiceApi;
