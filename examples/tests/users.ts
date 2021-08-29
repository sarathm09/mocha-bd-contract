import { GET } from '../../src/constants/http-methods'
import Validator from '../../src'
import { join } from 'path'

process.env.SCHEMA_DIRECTORY = join(__dirname, '..', 'schemas') // or use dotenv to set the environment variable

const { validate, initiate } = new Validator({
    suite: 'Users list API should return 6 users',
    app: { baseUrl: 'https://reqres.in/api' }
})

describe('Users API', async () => {
    await initiate()

    validate(() => ({
        given: 'I have at least one user in the system',
        when: 'I call the /users api',
        with: {
            url: '/users',
            method: GET
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
    }))
})
