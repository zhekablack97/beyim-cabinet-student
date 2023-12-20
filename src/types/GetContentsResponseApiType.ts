export interface Post {
    microtopicId: number;
    objectiveId: number;
    subject: string;
    microtopic: string;
    objective: string;
    iconUrl: string;
    subjectId: number;
    id: string;
    category: 'image' | 'video' | 'activity';
    resources: string[];
    contentId: string;
    description: string;
    thumbnail: string;
}

export interface Data {
    posts: Post[];
    total: number;
    limit: number;
    offset: number;
    isLastPage: boolean;
}
export interface GetContentsResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
