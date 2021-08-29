"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemas = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const chai_1 = require("chai");
const SCHEMA_DIRECTORY = process.env.SCHEMA_DIRECTORY;
const schemaRefs = {};
const { readdir } = require('fs').promises;
/**
 * Load the schema files from the schema directory and compile them using ajv
 */
const loadSchemas = async (schemaDirectory = SCHEMA_DIRECTORY, ajv) => {
    for await (const file of getFiles()) {
        try {
            if (file.endsWith('app-config.json'))
                continue;
            const schemaFileRef = file.replace(schemaDirectory, '').slice(1).replace('.json', '').split(path_1.sep).join('.');
            console.debug(`Loading schema [${schemaFileRef}] from ${file}`);
            const schema = JSON.parse((0, fs_1.readFileSync)(file, 'utf-8'));
            ajv.addSchema(schema, schema['$id']);
            schemaRefs[schemaFileRef] = schema['$id'];
        }
        catch (e) {
            console.error(`Could not load schema [${file}]: ${e}`);
            chai_1.assert.fail('Error loading schema');
        }
    }
    return schemaRefs;
};
exports.loadSchemas = loadSchemas;
/**
 * Recursively load all files from a directory.
 * Used to load all schema files
 *
 * @param directory directory path
 */
// eslint-disable-next-line no-undef
async function* getFiles(directory = SCHEMA_DIRECTORY) {
    const files = await readdir(directory, { withFileTypes: true });
    if (directory) {
        for (const file of files) {
            const res = (0, path_1.resolve)(directory, file.name);
            if (file.isDirectory()) {
                yield* getFiles(res);
            }
            else {
                yield res;
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWlDO0FBQ2pDLCtCQUFtQztBQUNuQywrQkFBNkI7QUFHN0IsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFBO0FBQ3JELE1BQU0sVUFBVSxHQUFvQyxFQUFFLENBQUE7QUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFFMUM7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsZUFBZSxHQUFHLGdCQUFnQixFQUFFLEdBQVEsRUFBRSxFQUFFO0lBQzlFLElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRSxFQUFFO1FBQ2pDLElBQUk7WUFDQSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7Z0JBQUUsU0FBUTtZQUU5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQzFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLGFBQWEsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBRS9ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBQSxpQkFBWSxFQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBQ3RELEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1lBQ3BDLFVBQVUsQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDNUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3RELGFBQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtTQUN0QztLQUNKO0lBQ0QsT0FBTyxVQUFVLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBakJZLFFBQUEsV0FBVyxlQWlCdkI7QUFFRDs7Ozs7R0FLRztBQUNILG9DQUFvQztBQUNwQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCO0lBQ2pELE1BQU0sS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELElBQUksU0FBUyxFQUFFO1FBQ1gsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDdEIsTUFBTSxHQUFHLEdBQUcsSUFBQSxjQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN6QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEIsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ3ZCO2lCQUFNO2dCQUNILE1BQU0sR0FBRyxDQUFBO2FBQ1o7U0FDSjtLQUNKO0FBQ0wsQ0FBQyJ9