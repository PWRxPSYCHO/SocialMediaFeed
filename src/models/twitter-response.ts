export interface TwitterResponse {
    data: Data;
    matching_rules: StreamRules[];
}
export interface Data {
    id: string;
    text: string;
}

export interface StreamRules {
    id: string;
    tag: string;
}