import test from 'node:test';
import assert from 'node:assert'
import { promisify } from 'node:util';

test('Hero integration test suite', async (t) => {
    const testPort = 9001

    // bad thing to do :)
    process.env.PORT = testPort
    const { server } = await import('../../src/index.js')
    const testServeAddress = `http://localhost:${testPort}/heroes`

    await t.test('it should create new hero', async (t) => {
        const data = {
            name: "Peter",
            age: 20,
            power: "spider"
        }
        const request = await fetch(testServeAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')
        assert.strictEqual(request.status, 201)

        const result = await request.json();
        assert.deepStrictEqual(result.success, 'User created with success!')
        assert.ok(result.id.length > 30, 'id should be valid uuid')
    })
    await promisify(server.close.bind(server))()
})