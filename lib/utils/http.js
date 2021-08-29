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
 * @param url Request Url
 * @param data Data to be sent as payload to request
 * @returns Response as a promise
 */
const performRequest = async (method, url, data, headers) => {
    var _a, _b;
    let response;
    try {
        response = await (0, axios_1.default)({
            method: ((method === null || method === void 0 ? void 0 : method.toLowerCase()) || 'get'),
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
        if (+(e.response.status || 200) >= 500)
            chai_1.assert.fail(message);
    }
    return response;
};
exports.performRequest = performRequest;
exports.default = exports.performRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9odHRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGtEQUFvRDtBQUVwRCwrQkFBNkI7QUFFN0I7Ozs7Ozs7R0FPRztBQUNJLE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxNQUFtQixFQUFFLEdBQVcsRUFBRSxJQUFVLEVBQUUsT0FBcUIsRUFBK0IsRUFBRTs7SUFDckksSUFBSSxRQUFRLENBQUE7SUFDWixJQUFJO1FBQ0EsUUFBUSxHQUFHLE1BQU0sSUFBQSxlQUFLLEVBQUM7WUFDbkIsTUFBTSxFQUFFLENBQUMsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsV0FBVyxFQUFFLEtBQUksS0FBSyxDQUFXO1lBQ2xELEdBQUc7WUFDSCxJQUFJO1lBQ0osT0FBTyxFQUFFO2dCQUNMLGNBQWMsRUFBRSxrQkFBa0I7Z0JBQ2xDLEdBQUcsT0FBTzthQUNiO1NBQ0osQ0FBQyxDQUFBO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sT0FBTyxHQUFHLGlCQUFpQixHQUFHO29CQUN4QixHQUFHO2lCQUNOLENBQUMsQ0FBQyxPQUFPO29CQUNOLENBQUEsTUFBQSxDQUFDLENBQUMsUUFBUSwwQ0FBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBQSxDQUFDLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUE7UUFDdEUsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUE7UUFDckIsSUFBSSxDQUFDLENBQUUsQ0FBQyxDQUFDLFFBQTBCLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUc7WUFBRSxhQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQ2xGO0lBQ0QsT0FBTyxRQUE4QixDQUFBO0FBQ3pDLENBQUMsQ0FBQTtBQXJCWSxRQUFBLGNBQWMsa0JBcUIxQjtBQUVELGtCQUFlLHNCQUFjLENBQUEifQ==