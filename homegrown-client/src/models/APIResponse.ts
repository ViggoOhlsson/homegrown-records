export default interface APIResponse<T> {
    message?: string
    content: T
}