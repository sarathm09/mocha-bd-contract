"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const chai_1 = require("chai");
/**
 * Make the HTTP request and return response
 *
 * @param method HTTP request method
 * @param baseUrl Base Url of the app
 * @param url Request Url
 * @param data Data to be sent as payload to request
 * @returns Response as a promise
 */
const performRequest = async (method, baseUrl, url, data, headers) => {
    var _a, _b, _c;
    let response;
    try {
        response = await (0, axios_1.default)({
            method: ((method === null || method === void 0 ? void 0 : method.toLowerCase()) || 'get'),
            baseURL: baseUrl,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });
    }
    catch (e) {
        const message = `Error calling ${url}
        Full Url: ${url}
        Error: ${e.message} 
        Response: ${((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) ? JSON.stringify((_b = e.response) === null || _b === void 0 ? void 0 : _b.data) : ''}`;
        response = e.response;
        if (+(((_c = e.response) === null || _c === void 0 ? void 0 : _c.status) || 200) >= 500)
            chai_1.assert.fail(message);
    }
    return response;
};
exports.performRequest = performRequest;
exports.default = exports.performRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9odHRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGtEQUFvRDtBQUVwRCwrQkFBNkI7QUFFN0I7Ozs7Ozs7O0dBUUc7QUFDSSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsTUFBbUIsRUFBRSxPQUFlLEVBQUUsR0FBVyxFQUFFLElBQVUsRUFBRSxPQUFxQixFQUErQixFQUFFOztJQUN0SixJQUFJLFFBQVEsQ0FBQTtJQUNaLElBQUk7UUFDQSxRQUFRLEdBQUcsTUFBTSxJQUFBLGVBQUssRUFBQztZQUNuQixNQUFNLEVBQUUsQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxXQUFXLEVBQUUsS0FBSSxLQUFLLENBQVc7WUFDbEQsT0FBTyxFQUFFLE9BQU87WUFDaEIsR0FBRztZQUNILElBQUk7WUFDSixPQUFPLEVBQUU7Z0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtnQkFDbEMsR0FBRyxPQUFPO2FBQ2I7U0FDSixDQUFDLENBQUE7S0FDTDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsTUFBTSxPQUFPLEdBQUcsaUJBQWlCLEdBQUc7b0JBQ3hCLEdBQUc7aUJBQ04sQ0FBQyxDQUFDLE9BQU87b0JBQ04sQ0FBQSxNQUFBLENBQUMsQ0FBQyxRQUFRLDBDQUFFLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFBLENBQUMsQ0FBQyxRQUFRLDBDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUN0RSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQTtRQUNyQixJQUFJLENBQUMsQ0FBQyxDQUFBLE1BQUMsQ0FBQyxDQUFDLFFBQTBCLDBDQUFFLE1BQU0sS0FBSSxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQUUsYUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUNuRjtJQUNELE9BQU8sUUFBOEIsQ0FBQTtBQUN6QyxDQUFDLENBQUE7QUF0QlksUUFBQSxjQUFjLGtCQXNCMUI7QUFFRCxrQkFBZSxzQkFBYyxDQUFBIn0=