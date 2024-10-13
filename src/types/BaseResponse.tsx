export interface BaseResponse {
    ErrorCode: number,
    DevMessage:string,
    UserMessage:string,
    TraceId: string,
    MoreInfo: string,
    Errors: object
}