export type Binary = Buffer|Uint8Array|Blob|string;

export interface MessageAttributeValue {
    string_value?: string;
    binary_value?: Binary;
    data_type: string;
}

export interface Message {
    event_metadata: {
        event_id: string;
        event_type: string;
        created_at: string;
    };
    details: {
        queue_id: string;
        message: {
            message_id: string;
            md5_of_body: string;
            body: string;
            attributes: {
                [T: string]: any;
            };
            message_attributes: {
                [key: string]: MessageAttributeValue
            };
            md5_of_message_attributes: string;
        }
    };

}

export interface MessagesContainer {
    messages: Message[]
}