export interface Question {
    question_id: string;
    is_correct: boolean;
    answer: any;
    explanation: any;
    correct_count: number;
    total_count: number;
}
export interface Progress {
    id: number;
    percentage: number;
    threshold: number;
    total_score: number;
    score: number;
    has_passed: boolean;
    duration: number;
    section_id: number;
    section_name: string;
    section_type_id: number;
    section_type_name: string;
    questions: Question[];
    started_at: string;
    due: string;
    completed_at: string;
}
export interface Data {
    progress: Progress;
}

export interface PostGetProgressResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
