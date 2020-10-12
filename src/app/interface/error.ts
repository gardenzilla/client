export interface HttpError {
    kind: string,
    message: string,
    code?: number,
    raw?: string
}