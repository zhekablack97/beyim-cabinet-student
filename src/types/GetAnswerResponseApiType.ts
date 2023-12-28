export interface Answer {
    id: string;
    is_correct: boolean;
    answer: number | number[];
}

export interface Data {
    answers: Answer[] | null;
}

export interface GetAnswerResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
