"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("./utils/contract");
const files_1 = require("./utils/files");
const ajv_1 = __importDefault(require("ajv"));
class Validator {
    constructor(config) {
        this.$ajv = new ajv_1.default();
        this.$schemaDirectory = config.schemaDirectory;
        this.$schemaRefs = {};
        this.$config = config;
        return this;
    }
    async initiate() {
        var _a, _b, _c, _d;
        const refs = await (0, files_1.loadSchemas)(this.$schemaDirectory, this.$ajv);
        this.$schemaRefs = refs;
        (0, contract_1.setSchemaRefs)(refs);
        return (0, contract_1.getValidator)({
            name: ((_b = (_a = this.$config) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.name) || '',
            url: ((_d = (_c = this.$config) === null || _c === void 0 ? void 0 : _c.app) === null || _d === void 0 ? void 0 : _d.baseUrl) || ''
        });
    }
}
exports.default = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQ0FBOEQ7QUFDOUQseUNBQTJDO0FBQzNDLDhDQUFxQjtBQVVyQixNQUFxQixTQUFTO0lBTTFCLFlBQVksTUFBdUI7UUFMbkMsU0FBSSxHQUFHLElBQUksYUFBRyxFQUFFLENBQUE7UUFNWixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQTtRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQTtRQUNyQixPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTs7UUFDVixNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLElBQUEsd0JBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQTtRQUVuQixPQUFPLElBQUEsdUJBQVksRUFBQztZQUNoQixJQUFJLEVBQUUsQ0FBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsR0FBRywwQ0FBRSxJQUFJLEtBQUksRUFBRTtZQUNuQyxHQUFHLEVBQUUsQ0FBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsR0FBRywwQ0FBRSxPQUFPLEtBQUksRUFBRTtTQUN4QyxDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUF2QkQsNEJBdUJDIn0=