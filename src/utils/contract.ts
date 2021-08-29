import { App, ContractInteraction, Condition } from '../types/contract'
import { AnyValidateFunction, ErrorObject } from 'ajv/dist/types'
import { blueBright, cyanBright, red, redBright } from 'chalk'
import { POST } from '../constants/http-methods'
import { performRequest } from './http'
import { customAlphabet } from 'nanoid'
import { assert, expect } from 'chai'
import Ajv from 'ajv'

let ajv = new Ajv()
type contentType = 'json' | 'string'
const nanoid = customAlphabet('1234567890', 10)
let schemaRefs: { [schemaRef: string]: string } = {}

/**
 * Initialize schema refs
 *
 * @param refs Map of schema id and ref
 */
export const setSchemaRefs = (refs: { [schemaRef: string]: string }) => (schemaRefs = refs)

/**
 * Initialize Ajv
 *
 * @param instance Ajv instance
 */
export const setAjv = (instance: Ajv) => (ajv = instance)

/**
 * Parse AJV errors and make a meaningful string from it
 *
 * @param validationErrors AJV validation errors
 * @returns Parsed error string
 */
const parseErrors = (validationErrors: ErrorObject<string, Record<string, any>, unknown>[] | null | undefined = []) => {
    const PADDING_SIZE = 25
    if (!!validationErrors && validationErrors.length > 0) {
        let errors: string[] = []
        validationErrors?.forEach((error) => {
            Object.entries(error).forEach(([key, value]) => {
                if (typeof value === 'string' || typeof value === 'number') {
                    errors.push(`\t${red(key).padEnd(PADDING_SIZE)}: ${redBright(value)}`)
                } else if (typeof value === 'object') {
                    errors = [...errors, `\t${red(key).padEnd(PADDING_SIZE)}`, ...Object.entries(value).map(([k, v]) => `\t  ${red(k).padEnd(PADDING_SIZE - 2)}: ${redBright(v)}`)]
                }
            })
        })
        return errors.join('\n')
    }
    return ''
}

/**
 * Validate the response schema
 *
 * @param responseBody API response body
 * @param contentType API content type
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateResponseSchema = async (responseBody: any, contentType: contentType, contract: ContractInteraction, requestId: string) => {
    if (contract.expect.schema) {
        if (contentType === 'json') {
            const validate = ajv.getSchema(schemaRefs[contract.expect.schema]) as AnyValidateFunction<unknown>
            if (!validate(responseBody)) {
                assert.fail(`#${requestId} Schema contract failed\n ${parseErrors(validate.errors)}\n\t`)
            }
        } else {
            assert.fail(`#${requestId} Contract schema testing is supported only for json response`)
        }
    }
}

/**
 * Validate the response body
 *
 * @param responseBody API response body
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateResponseBody = async (responseBody: any, contract: ContractInteraction, requestId: string) => {
    if (contract.expect.body) {
        expect(contract.expect.body, `#${requestId} Response body does not match`).to.deep.equal(responseBody)
    }
}

/**
 * Validate the conditions expected in the contract
 *
 * @param responseBody API response body
 * @param contract Contract schema name
 * @param requestId Id of the request
 */
const validateExpectedCondition = async (responseBody: any, contract: ContractInteraction, requestId: string) => {
    if (!!contract.expect.fulfilsConditions && contract.expect.fulfilsConditions.length > 0) {
        for (let ci = 0; ci < contract.expect.fulfilsConditions(responseBody).length; ci++) {
            const expectedCondition = contract.expect.fulfilsConditions(responseBody)[ci] as Condition
            if (!expectedCondition.check) {
                assert.fail(`#${requestId} Condition not fulfilled: '${expectedCondition.message}'`)
            }
        }
    }
}

/**
 * Get a GWT styles title for the test
 *
 * @param contract Contract details
 * @param requestId Request id
 * @returns formatted contract title
 */
const getTestTitle = (suite: string, contract: ContractInteraction, requestId: string) => {
    return `${cyanBright('#' + requestId)}${suite ? `: ${suite}` : ''}
    ${blueBright('GIVEN')}: ${cyanBright(contract.given)}
    ${blueBright('WHEN')} : ${cyanBright(contract.when)}
    ${blueBright('THEN')} : ${cyanBright(contract.then.padEnd(70, ' '))}`
}

/**
 * Get the mocha test function to validate the contract
 *
 * @param app The app details, defined in the config file
 * @param contractFn A lambda function that returns the contract JSON
 * @returns a mocha test function
 */
export const getValidator = (app: App | undefined) => (contractFn: () => ContractInteraction) => {
    const requestId = nanoid()

    return it(cyanBright('#' + requestId), async function () {
        const contract = contractFn() as ContractInteraction
        const contentType = contract?.expect?.contentType || 'json'
        if (this.test) this.test.title = getTestTitle(app?.suite || '', contract, requestId)

        expect(!!app, 'App cannot be undefined').to.be.true

        if (app) {
            const requestPayload = 'query' in contract.with ? { query: contract.with.query, variables: contract.with.variables || {} } : contract.with.payload
            const response =
                'query' in contract.with
                    ? await performRequest(POST, app.url, contract.with.url || '', requestPayload, contract.with.headers || {})
                    : await performRequest(contract.with.method, app.url, contract.with.url, requestPayload, contract.with.headers || {})

            expect(!!response.status, 'Response status is undefined').to.true
            expect(response.status).to.equal(contract.expect.statusCode, `Response status is ${response.status}, but expected was ${contract.expect.statusCode}`)

            await Promise.all([
                validateResponseSchema(response.data, contentType, contract, requestId),
                validateResponseBody(response.data, contract, requestId),
                validateExpectedCondition(response.data, contract, requestId)
            ])
        }
    })
}
