"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemas = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const chai_1 = require("chai");
const { readdir } = require('fs').promises;
/**
 * Load the schema files from the schema directory and compile them using ajv
 */
const loadSchemas = async (ajv, schemaRefs = {}, schemaDirectory) => {
    if (!schemaDirectory) {
        console.error('environment variable `SCHEMA_DIRECTORY` missing.');
        process.exit(1);
    }
    for await (const file of getFiles(schemaDirectory)) {
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
async function* getFiles(directory) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWlDO0FBQ2pDLCtCQUFtQztBQUNuQywrQkFBNkI7QUFHN0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUE7QUFFMUM7O0dBRUc7QUFDSSxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsR0FBUSxFQUFFLGFBQThDLEVBQUUsRUFBRSxlQUF1QixFQUFFLEVBQUU7SUFDckgsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUE7UUFDakUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNsQjtJQUVELElBQUksS0FBSyxFQUFFLE1BQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNoRCxJQUFJO1lBQ0EsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO2dCQUFFLFNBQVE7WUFFOUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMxRyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixhQUFhLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUUvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsaUJBQVksRUFBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtZQUN0RCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtZQUNwQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzVDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLDBCQUEwQixJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN0RCxhQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7U0FDdEM7S0FDSjtJQUNELE9BQU8sVUFBVSxDQUFBO0FBQ3JCLENBQUMsQ0FBQTtBQXRCWSxRQUFBLFdBQVcsZUFzQnZCO0FBRUQ7Ozs7O0dBS0c7QUFDSCxvQ0FBb0M7QUFDcEMsS0FBSyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBaUI7SUFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDL0QsSUFBSSxTQUFTLEVBQUU7UUFDWCxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFBLGNBQU8sRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3pDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwQixLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDdkI7aUJBQU07Z0JBQ0gsTUFBTSxHQUFHLENBQUE7YUFDWjtTQUNKO0tBQ0o7QUFDTCxDQUFDIn0=