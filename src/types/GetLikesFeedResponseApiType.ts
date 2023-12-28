export interface Option {
    Body: string;
}
export interface Activity {
    id: string;
    type: string;
    title: string;
    level: number;
    body: string;
    options: Option[];
    hintsCount: number;
}
export interface Post {
    id: string;
    category: 'activity' | 'video' | 'image';
    resources: string[];
    contentId: string;
    description: string;
    thumbnail: string;
}

export interface Daum {
    microtopicId: number;
    objectiveId: number;
    subject: string;
    microtopic: string;
    objective: string;
    iconUrl: string;
    category: 'activity' | 'video' | 'image';
    locale: string;
    post?: Post;
    activity?: Activity;
}
export interface Data {
    data: Daum[];
    total: number;
    limit: number;
    offset: number;
    isLastPage: boolean;
}

export interface GetLikesFeedResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
