import { getValidator, setAjv, setSchemaRefs } from './utils/contract'
import { ContractInteraction } from './types/contract'
import { loadSchemas } from './utils/files'
import Ajv from 'ajv'

export interface ValidatorConfig {
    app?: {
        name?: string
        baseUrl?: string
    }
    suite?: string
}

let schemaRefs: { [schemaRef: string]: string } = {}
let ajv = new Ajv()

export default class Validator {
    $suite: string
    $config: ValidatorConfig
    validate: (contractFn: () => ContractInteraction) => Mocha.Test

    constructor(config: ValidatorConfig) {
        this.$config = config
        this.$suite = config.suite || ''

        this.validate = getValidator({
            suite: this.$suite,
            name: this.$config?.app?.name || '',
            url: this.$config?.app?.baseUrl || ''
        })

        return this
    }

    initiate = async () => {
        const refs = await loadSchemas(ajv, schemaRefs, process.env.SCHEMA_DIRECTORY || '')
        setSchemaRefs(refs)
        setAjv(ajv)
    }
}
