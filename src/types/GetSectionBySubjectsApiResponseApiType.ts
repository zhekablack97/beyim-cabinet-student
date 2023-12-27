export interface Translation {
    locale: 'kk' | 'ru' | 'en';
    name: string;
}

export interface Children {
    id: number;
    subject_id: number;
    type_id: number;
    parent_id: number;
    order: number;
    createdAt: string;
    updatedAt: string;
    translations: Translation[];
}

export interface Section {
    id: number;
    subject_id: number;
    type_id: number;
    parent_id: number;
    order: number;
    createdAt: string;
    updatedAt: string;
    translations: Translation[];
    children: Children[];
}

export interface Data {
    sections: Section[];
    total: number;
    limit: number;
    offset: number;
    isLastPage: boolean;
}

export interface GetSectionBySubjectsApiResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
