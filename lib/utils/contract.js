"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidator = exports.setAjv = exports.setSchemaRefs = void 0;
const chalk_1 = require("chalk");
const http_methods_1 = require("~/constants/http-methods");
const http_1 = require("./http");
const nanoid_1 = require("nanoid");
const chai_1 = require("chai");
const ajv_1 = __importDefault(require("ajv"));
let ajv = new ajv_1.default();
const nanoid = (0, nanoid_1.customAlphabet)('1234567890', 10);
let schemaRefs = {};
/**
 * Initialize schema refs
 *
 * @param refs Map of schema id and ref
 */
const setSchemaRefs = (refs) => (schemaRefs = refs);
exports.setSchemaRefs = setSchemaRefs;
/**
 * Initialize Ajv
 *
 * @param instance Ajv instance
 */
const setAjv = (instance) => (ajv = instance);
exports.setAjv = setAjv;
/**
 * Parse AJV errors and make a meaningful string from it
 *
 * @param validationErrors AJV validation errors
 * @returns Parsed error string
 */
const parseErrors = (validationErrors = []) => {
    const PADDING_SIZE = 25;
    if (!!validationErrors && validationErrors.length > 0) {
        let errors = [];
        validationErrors === null || validationErrors === void 0 ? void 0 : validationErrors.forEach((error) => {
            Object.entries(error).forEach(([key, value]) => {
                if (typeof value === 'string' || typeof value === 'number') {
                    errors.push(`\t${(0, chalk_1.red)(key).padEnd(PADDING_SIZE)}: ${(0, chalk_1.redBright)(value)}`);
                }
                else if (typeof value === 'object') {
                    errors = [...errors, `\t${(0, chalk_1.red)(key).padEnd(PADDING_SIZE)}`, ...Object.entries(value).map(([k, v]) => `\t  ${(0, chalk_1.red)(k).padEnd(PADDING_SIZE - 2)}: ${(0, chalk_1.redBright)(v)}`)];
                }
            });
        });
        return errors.join('\n');
    }
    return '';
};
/**
 * Validate the response schema
 *
 * @param responseBody API response body
 * @param contentType API content type
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateResponseSchema = async (responseBody, contentType, contract, requestId) => {
    if (contract.expect.schema) {
        if (contentType === 'json') {
            const validate = ajv.getSchema(schemaRefs[contract.expect.schema]);
            if (!validate(responseBody)) {
                chai_1.assert.fail(`#${requestId} Schema contract failed\n ${parseErrors(validate.errors)}\n\t`);
            }
        }
        else {
            chai_1.assert.fail(`#${requestId} Contract schema testing is supported only for json response`);
        }
    }
};
/**
 * Validate the response body
 *
 * @param responseBody API response body
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateResponseBody = async (responseBody, contract, requestId) => {
    if (contract.expect.body) {
        (0, chai_1.expect)(contract.expect.body, `#${requestId} Response body does not match`).to.deep.equal(responseBody);
    }
};
/**
 * Validate the conditions expected in the contract
 *
 * @param responseBody API response body
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateExpectedCondition = async (responseBody, contract, requestId) => {
    if (!!contract.expect.fulfilsConditions && contract.expect.fulfilsConditions.length > 0) {
        for (let ci = 0; ci < contract.expect.fulfilsConditions(responseBody).length; ci++) {
            const expectedCondition = contract.expect.fulfilsConditions(responseBody)[ci];
            if (!expectedCondition.check) {
                chai_1.assert.fail(`#${requestId} Condition not fulfilled: '${expectedCondition.message}'`);
            }
        }
    }
};
/**
 * Get a GWT styles title for the test
 *
 * @param contract Contract details
 * @param requestId Request id
 * @returns formatted contract title
 */
const getTestTitle = (contract, requestId) => `${(0, chalk_1.cyanBright)('#' + requestId)}
        ${(0, chalk_1.blueBright)('GIVEN')}: ${(0, chalk_1.cyanBright)(contract.given)}
        ${(0, chalk_1.blueBright)('WHEN')} : ${(0, chalk_1.cyanBright)(contract.when)}
        ${(0, chalk_1.blueBright)('THEN')} : ${(0, chalk_1.cyanBright)(contract.then.padEnd(70, ' '))}`;
/**
 * Get the mocha test function to validate the contract
 *
 * @param app The app details, defined in the config file
 * @param contractFn A lambda function that returns the contract JSON
 * @returns a mocha test function
 */
const getValidator = (app) => (contractFn) => {
    const requestId = nanoid();
    return it((0, chalk_1.cyanBright)('#' + requestId), async function () {
        var _a;
        const contract = contractFn();
        const contentType = ((_a = contract === null || contract === void 0 ? void 0 : contract.expect) === null || _a === void 0 ? void 0 : _a.contentType) || 'json';
        if (this.test)
            this.test.title = getTestTitle(contract, requestId);
        (0, chai_1.expect)(!!app, 'App cannot be undefined').to.be.true;
        if (app) {
            const requestPayload = 'query' in contract.with ? { query: contract.with.query, variables: contract.with.variables || {} } : contract.with.payload;
            const response = 'query' in contract.with
                ? await (0, http_1.performRequest)(http_methods_1.POST, contract.with.url || '', requestPayload, contract.with.headers || {})
                : await (0, http_1.performRequest)(contract.with.method, contract.with.url, requestPayload, contract.with.headers || {});
            (0, chai_1.expect)(!!response.status, 'Response status is undefined').to.true;
            (0, chai_1.expect)(response.status).to.equal(contract.expect.statusCode, `Response status is ${response.status}, but expected was ${contract.expect.statusCode}`);
            await Promise.all([
                validateResponseSchema(response.data, contentType, contract, requestId),
                validateResponseBody(response.data, contract, requestId),
                validateExpectedCondition(response.data, contract, requestId)
            ]);
        }
    });
};
exports.getValidator = getValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsaUNBQThEO0FBQzlELDJEQUErQztBQUMvQyxpQ0FBdUM7QUFDdkMsbUNBQXVDO0FBQ3ZDLCtCQUFxQztBQUNyQyw4Q0FBcUI7QUFFckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQTtBQUVuQixNQUFNLE1BQU0sR0FBRyxJQUFBLHVCQUFjLEVBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQy9DLElBQUksVUFBVSxHQUFvQyxFQUFFLENBQUE7QUFFcEQ7Ozs7R0FJRztBQUNJLE1BQU0sYUFBYSxHQUFHLENBQUMsSUFBcUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFBOUUsUUFBQSxhQUFhLGlCQUFpRTtBQUUzRjs7OztHQUlHO0FBQ0ksTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFBO0FBQTVDLFFBQUEsTUFBTSxVQUFzQztBQUV6RDs7Ozs7R0FLRztBQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsbUJBQTJGLEVBQUUsRUFBRSxFQUFFO0lBQ2xILE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUN2QixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25ELElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQTtRQUN6QixnQkFBZ0IsYUFBaEIsZ0JBQWdCLHVCQUFoQixnQkFBZ0IsQ0FBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FB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