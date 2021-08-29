/// <reference types="mocha" />
import Ajv from 'ajv';
export interface ValidatorConfig {
    app?: {
        name?: string;
        baseUrl?: string;
    };
    schemaDirectory: string;
}
export default class Validator {
    $ajv: Ajv;
    $config: ValidatorConfig;
    $schemaDirectory: string;
    $schemaRefs: {
        [schemaRef: string]: string;
    };
    constructor(config: ValidatorConfig);
    initiate(): Promise<(contractFn: () => import("./types/contract").ContractInteraction) => Mocha.Test>;
}
//# sourceMappingURL=index.d.ts.map