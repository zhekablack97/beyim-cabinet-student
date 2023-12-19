export interface Translation {
    locale: string;
    name: string;
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
}

export interface DataSection {
    sections: Section[];
    total: number;
    limit: number;
    offset: number;
    isLastPage: boolean;
}

export interface GetSectionsResponseApiType {
    success: boolean;
    message: string;
    data: DataSection;
}
