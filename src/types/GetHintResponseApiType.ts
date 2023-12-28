export interface Hint {
    body: string;
}

export interface Data {
    hint: Hint;
    isLast: boolean;
}

export interface GetHintResponseApiType {
    success: boolean;
    message: string;
    data: Data;
}
