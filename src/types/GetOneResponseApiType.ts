export interface Post {
    id: string;
    category: string;
    resources: string[];
    contentId: string;
    description: string;
    thumbnail: string;
}

export interface Data {
    post: Post;
}

export interface GetOneResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
