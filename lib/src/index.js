"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contract_1 = require("./utils/contract");
const files_1 = require("./utils/files");
const ajv_1 = __importDefault(require("ajv"));
let schemaRefs = {};
let ajv = new ajv_1.default();
class Validator {
    constructor(config) {
        var _a, _b, _c, _d;
        this.initiate = async () => {
            const refs = await (0, files_1.loadSchemas)(ajv, schemaRefs, process.env.SCHEMA_DIRECTORY || '');
            (0, contract_1.setSchemaRefs)(refs);
            (0, contract_1.setAjv)(ajv);
        };
        this.$config = config;
        this.$suite = config.suite || '';
        this.validate = (0, contract_1.getValidator)({
            suite: this.$suite,
            name: ((_b = (_a = this.$config) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.name) || '',
            url: ((_d = (_c = this.$config) === null || _c === void 0 ? void 0 : _c.app) === null || _d === void 0 ? void 0 : _d.baseUrl) || ''
        });
        return this;
    }
}
exports.default = Validator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQ0FBc0U7QUFFdEUseUNBQTJDO0FBQzNDLDhDQUFxQjtBQVVyQixJQUFJLFVBQVUsR0FBb0MsRUFBRSxDQUFBO0FBQ3BELElBQUksR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUE7QUFFbkIsTUFBcUIsU0FBUztJQUsxQixZQUFZLE1BQXVCOztRQWFuQyxhQUFRLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLG1CQUFXLEVBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQ25GLElBQUEsd0JBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQixJQUFBLGlCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFDZixDQUFDLENBQUE7UUFoQkcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQTtRQUVoQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUEsdUJBQVksRUFBQztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbEIsSUFBSSxFQUFFLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLEdBQUcsMENBQUUsSUFBSSxLQUFJLEVBQUU7WUFDbkMsR0FBRyxFQUFFLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLEdBQUcsMENBQUUsT0FBTyxLQUFJLEVBQUU7U0FDeEMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxJQUFJLENBQUE7SUFDZixDQUFDO0NBT0o7QUF2QkQsNEJBdUJDIn0=