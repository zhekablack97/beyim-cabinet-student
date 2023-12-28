export interface Answer {
    answer: number;
    id: string;
}

export interface PostAnswersAssessmentRequestApiType {
    progress_id: number;
    answers: Answer[];
}
