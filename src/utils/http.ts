import { HTTP_METHOD } from '../constants/http-methods'
import axios, { AxiosResponse, Method } from 'axios'
import { httpHeaders } from '../types/contract'
import { assert } from 'chai'

/**
 * Make the HTTP request and return response
 *
 * @param method HTTP request method
 * @param baseUrl Base Url of the app
 * @param url Request Url
 * @param data Data to be sent as payload to request
 * @returns Response as a promise
 */
export const performRequest = async (method: HTTP_METHOD, baseUrl: string, url: string, data?: any, headers?: httpHeaders): Promise<AxiosResponse<any>> => {
    let response
    try {
        response = await axios({
            method: (method?.toLowerCase() || 'get') as Method,
            baseURL: baseUrl,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        })
    } catch (e) {
        const message = `Error calling ${url}
        Full Url: ${url}
        Error: ${e.message} 
        Response: ${e.response?.data ? JSON.stringify(e.response?.data) : ''}`
        response = e.response
        if (+((e.response as AxiosResponse)?.status || 200) >= 500) assert.fail(message)
    }
    return response as AxiosResponse<any>
}

export default performRequest
