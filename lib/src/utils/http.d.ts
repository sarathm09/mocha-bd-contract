import { HTTP_METHOD } from '../constants/http-methods';
import { AxiosResponse } from 'axios';
import { httpHeaders } from '../types/contract';
/**
 * Make the HTTP request and return response
 *
 * @param method HTTP request method
 * @param baseUrl Base Url of the app
 * @param url Request Url
 * @param data Data to be sent as payload to request
 * @returns Response as a promise
 */
export declare const performRequest: (method: HTTP_METHOD, baseUrl: string, url: string, data?: any, headers?: httpHeaders | undefined) => Promise<AxiosResponse<any>>;
export default performRequest;
//# sourceMappingURL=http.d.ts.map