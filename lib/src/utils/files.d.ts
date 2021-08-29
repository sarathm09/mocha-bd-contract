import Ajv from 'ajv';
/**
 * Load the schema files from the schema directory and compile them using ajv
 */
export declare const loadSchemas: (ajv: Ajv, schemaRefs: {
    [schemaRef: string]: string;
} | undefined, schemaDirectory: string) => Promise<{
    [schemaRef: string]: string;
}>;
//# sourceMappingURL=files.d.ts.map