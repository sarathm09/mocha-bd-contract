import { HTTP_METHOD } from '../constants/http-methods';
export declare type httpHeaders = {
    [key: string]: any;
};
export interface App {
    name: string;
    url: string;
}
export interface GraphQLRequest {
    url?: string;
    headers?: httpHeaders;
    query: string;
    variables?: {
        [key: string]: any;
    };
}
export interface RestRequest {
    url: string;
    method: HTTP_METHOD;
    payload?: any;
    headers?: httpHeaders;
}
export interface Condition {
    message: string;
    check: boolean;
}
export interface ContractInteraction {
    given: string;
    when: string;
    then: string;
    with: GraphQLRequest | RestRequest;
    expect: {
        statusCode: number;
        contentType?: 'json' | 'string';
        schema?: string;
        headers?: httpHeaders;
        body?: any;
        fulfilsConditions?: (responseBody: any) => Condition[];
    };
}
//# sourceMappingURL=contract.d.ts.map