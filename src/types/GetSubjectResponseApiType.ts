export interface Translation {
    locale: string;
    name: string;
}

export interface Subject {
    id: number;
    program_id: number;
    image_url: string;
    icon_url: string;
    createdAt: string;
    updatedAt: string;
    translations: Translation[];
}

export interface Data {
    subjects: Subject[];
    total: number;
    limit: number;
    offset: number;
    isLastPage: boolean;
}

export interface GetSubjectResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
