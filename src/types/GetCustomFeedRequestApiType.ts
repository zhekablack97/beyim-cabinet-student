export interface Option {
    Body: string;
}

export interface Activity {
    id: string;
    type: 'SS_MCQ' | 'MS_MCQ';
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
    thumbnail: string;
    microtopicId: number;
    objectiveId: number;
    subject: string;
    microtopic: string;
    objective: string;
    iconUrl: string;
    category: 'activity' | 'video' | 'image';
    post?: Post;
    activities?: Activity[];
}

export interface Data {
    data: Daum[];
}

export interface GetCustomFeedRequestApiType {
    success: boolean;
    message: string;
    data: Data;
}
