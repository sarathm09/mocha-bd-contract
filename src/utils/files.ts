import { readFileSync } from 'fs'
import { resolve, sep } from 'path'
import { assert } from 'chai'
import Ajv from 'ajv'

const { readdir } = require('fs').promises

/**
 * Load the schema files from the schema directory and compile them using ajv
 */
export const loadSchemas = async (ajv: Ajv, schemaRefs: { [schemaRef: string]: string } = {}, schemaDirectory: string) => {
    if (!schemaDirectory) {
        console.error('environment variable `SCHEMA_DIRECTORY` missing.')
        process.exit(1)
    }

    for await (const file of getFiles(schemaDirectory)) {
        try {
            if (file.endsWith('app-config.json')) continue

            const schemaFileRef = file.replace(schemaDirectory, '').slice(1).replace('.json', '').split(sep).join('.')
            console.debug(`Loading schema [${schemaFileRef}] from ${file}`)

            const schema = JSON.parse(readFileSync(file, 'utf-8'))
            ajv.addSchema(schema, schema['$id'])
            schemaRefs[schemaFileRef] = schema['$id']
        } catch (e) {
            console.error(`Could not load schema [${file}]: ${e}`)
            assert.fail('Error loading schema')
        }
    }
    return schemaRefs
}

/**
 * Recursively load all files from a directory.
 * Used to load all schema files
 *
 * @param directory directory path
 */
// eslint-disable-next-line no-undef
async function* getFiles(directory: string): AsyncGenerator<any, any, any> {
    const files = await readdir(directory, { withFileTypes: true })
    if (directory) {
        for (const file of files) {
            const res = resolve(directory, file.name)
            if (file.isDirectory()) {
                yield* getFiles(res)
            } else {
                yield res
            }
        }
    }
}
