export interface vkError {
    error_msg: string;
    [key: string]: any;
}

export interface vkResponse {
    post_id: number;
    queryData: {
        owner_id: number;
        message: string;
        access_token: string;
        [T: string]: any;
    }
}