export interface BaseException {
    errorCode: number;
    devMessage?: string;
    userMessage?: string;
    traceId?: string;
    moreInfo?: string;
    errors?: any;
}
