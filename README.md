# mocha-bd-contract
Behavior driven contract tests using mocha

## Getting Started

-   [NodeJS and NPM](https://nodejs.org/en/download/) should be installed on the local machine
-   Install this library using the command
    ```bash
    npm install mocha-bd-contract

    # or if you prefer using yarn,
    
    yarn add mocha-bd-contract
    ```

### Writing contracts
Contract tests in this repo are primarily focused on schema based validations. Whenever you call any api, it should exactly match a given JSON schema, and the schema can validate things line what all fields are possible, what their data types should be, what the data restrictions should be etc.

A sample contract test using schema validation would look like this:

```ts
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
```

Refer to the _examples_ folder for sample tests

- Since this is basically a mocha project, the `validate` call should be wrapped in a `describe` and you can use the mocha hooks like `before`, `after`, `beforeEach`, `afterEach` etc.
- The `expect` block can validate multiple things
    - `statusCode` will validate if the response status code is matching
    - `schema` will validate if the response matches the schema. `apm.assetbase.technical-object.list-success-response` means the `list-success-response.json` file inside _src/schemas/apm/assetbase/technical-object_ directory. So if you have the schema file in _src/schemas/apm/some-app/some-sub-folder/some-schema.json_, then, the schema syntax would be `apm.some-app.some-sub-folder.some-schema`
    - `body` will validate if the response body exactly matches the given object. Not recommended if the response body values keep changing
    - `fulfilsConditions` is a list of conditions that you can dynamically verify. The lambda has a parameter which will contain the API response.



### Execution result
The execution result would lok something like this:

```
✔ #3071819151: Users list API should return 6 users
    GIVEN: I have at least one user in the system
    WHEN : I call the /users api
    THEN : I should get a list of users                                           (154ms)

1 passing (155ms)
```