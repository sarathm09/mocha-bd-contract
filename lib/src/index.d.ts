/// <reference types="mocha" />
import { ContractInteraction } from './types/contract';
export interface ValidatorConfig {
    app?: {
        name?: string;
        baseUrl?: string;
    };
    suite?: string;
}
export default class Validator {
    $suite: string;
    $config: ValidatorConfig;
    validate: (contractFn: () => ContractInteraction) => Mocha.Test;
    constructor(config: ValidatorConfig);
    initiate: () => Promise<void>;
}
//# sourceMappingURL=index.d.ts.map