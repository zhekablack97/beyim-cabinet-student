export interface Content {
    id: string;
    locale: string;
    body: string;
    description: string;
    resources: any[];
    subjectId: number;
    microtopicId: number;
    status: string;
    authorId: string;
    difficulty: number;
    postsCount: number;
    activityCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Data {
    content: Content;
}

export interface GetOneContentResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
