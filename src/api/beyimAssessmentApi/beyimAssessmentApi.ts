import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { GetAssessmentInfoResponseApiType } from '../../types/beyimAssessmentApiType/GetAssessmentInfoResponseApiType';
import { GetAssessmentInfoRequestApiType } from '../../types/beyimAssessmentApiType/GetAssessmentInfoRequestApiType';
import { GetBulkAssessmentInfoResponseApiType } from '../../types/beyimAssessmentApiType/GetBulkAssessmentInfoResponseApiType';
import { GetBulkAssessmentInfoRequestApiType } from '../../types/beyimAssessmentApiType/GetBulkAssessmentInfoRequestApiType';

export const beyimAssessmentApi = createApi({
    reducerPath: 'BeyimAssessmentApi',
    tagTypes: ['BeyimAssessment'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BEYIM_ASSESSMENT_SERVICE_URL}/api/v1/`,
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
        getAssessmentInfo: build.query<
            GetAssessmentInfoResponseApiType,
            GetAssessmentInfoRequestApiType
        >({
            query: ({ locale = 'kk', section_id = 227, subject_id = 402 }) => {
                return {
                    url: `beyim-assessment/info?locale=${locale}&section_id=${section_id}&subject_id=${subject_id}`,
                };
            },
            providesTags: ['BeyimAssessment'],
        }),
        getBulkAssessmentInfo: build.query<
            GetBulkAssessmentInfoResponseApiType,
            GetBulkAssessmentInfoRequestApiType
        >({
            query: ({ locale, sectionIds, subjectId }) => {
                return {
                    url: `beyim-assessment/batch-info?locale=${locale}&section_ids=${sectionIds.join(
                        ',',
                    )}&subject_id=${subjectId}`,
                };
            },
            providesTags: ['BeyimAssessment'],
        }),
    }),
});

export const {
    useGetAssessmentInfoQuery,
    useLazyGetAssessmentInfoQuery,
    useGetBulkAssessmentInfoQuery,
    useLazyGetBulkAssessmentInfoQuery,
} = beyimAssessmentApi;
