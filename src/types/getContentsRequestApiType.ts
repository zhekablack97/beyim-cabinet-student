type TypeResources = 'image' | 'video'

export interface getContentsRequestApiType {
    locale?: string;
    microtopicIds?: number[];
    subjectIds?: string[];
    limit?: number;
    typeResources?: TypeResources[];
    page?: number;
}
