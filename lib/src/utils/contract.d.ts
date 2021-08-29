/// <reference types="mocha" />
import { App, ContractInteraction } from '../types/contract';
import Ajv from 'ajv';
/**
 * Initialize schema refs
 *
 * @param refs Map of schema id and ref
 */
export declare const setSchemaRefs: (refs: {
    [schemaRef: string]: string;
}) => {
    [schemaRef: string]: string;
};
/**
 * Initialize Ajv
 *
 * @param instance Ajv instance
 */
export declare const setAjv: (instance: Ajv) => Ajv;
/**
 * Get the mocha test function to validate the contract
 *
 * @param app The app details, defined in the config file
 * @param contractFn A lambda function that returns the contract JSON
 * @returns a mocha test function
 */
export declare const getValidator: (app: App | undefined) => (contractFn: () => ContractInteraction) => Mocha.Test;
//# sourceMappingURL=contract.d.ts.map