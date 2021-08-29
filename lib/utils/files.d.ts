import Ajv from 'ajv';
/**
 * Load the schema files from the schema directory and compile them using ajv
 */
export declare const loadSchemas: (schemaDirectory: string | undefined, ajv: Ajv) => Promise<{
    [schemaRef: string]: string;
}>;
//# sourceMappingURL=files.d.ts.map