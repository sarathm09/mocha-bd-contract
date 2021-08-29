"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_methods_1 = require("../../src/constants/http-methods");
const src_1 = __importDefault(require("../../src"));
const path_1 = require("path");
process.env.SCHEMA_DIRECTORY = (0, path_1.join)(__dirname, '..', 'schemas'); // or use dotenv to set the environment variable
const { validate, initiate } = new src_1.default({
    suite: 'Users list API should return 6 users',
    app: { baseUrl: 'https://reqres.in/api' }
});
describe('Users API', async () => {
    await initiate();
    validate(() => ({
        given: 'I have at least one user in the system',
        when: 'I call the /users api',
        with: {
            url: '/users',
            method: http_methods_1.GET
        },
        then: 'I should get a list of users',
        expect: {
            statusCode: 200,
            schema: 'users',
            fulfilsConditions: (response) => [
                {
                    message: 'There are 6 users',
                    check: response.data.length === 6
                }
            ]
        }
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9leGFtcGxlcy90ZXN0cy91c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1FQUFzRDtBQUN0RCxvREFBaUM7QUFDakMsK0JBQTJCO0FBRTNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsSUFBQSxXQUFJLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLGdEQUFnRDtBQUVoSCxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksYUFBUyxDQUFDO0lBQ3pDLEtBQUssRUFBRSxzQ0FBc0M7SUFDN0MsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFO0NBQzVDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDN0IsTUFBTSxRQUFRLEVBQUUsQ0FBQTtJQUVoQixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNaLEtBQUssRUFBRSx3Q0FBd0M7UUFDL0MsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixJQUFJLEVBQUU7WUFDRixHQUFHLEVBQUUsUUFBUTtZQUNiLE1BQU0sRUFBRSxrQkFBRztTQUNkO1FBQ0QsSUFBSSxFQUFFLDhCQUE4QjtRQUNwQyxNQUFNLEVBQUU7WUFDSixVQUFVLEVBQUUsR0FBRztZQUNmLE1BQU0sRUFBRSxPQUFPO1lBQ2YsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDO2dCQUM3QjtvQkFDSSxPQUFPLEVBQUUsbUJBQW1CO29CQUM1QixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztpQkFDcEM7YUFDSjtTQUNKO0tBQ0osQ0FBQyxDQUFDLENBQUE7QUFDUCxDQUFDLENBQUMsQ0FBQSJ9