import test from 'node:test'
import assert from 'node:assert'
import { routes } from '../../../src/routes/heroRoute.js'
import { DEFAULT_HEADER } from '../../../src/util/util.js'

const CallTracker = new assert.CallTracker();
process.on('exit', () => CallTracker.verify())

test('Hero route teste suite', async (t) => {
    // get
    await t.test('it should call /heroes:get route', async () => {
        const endpoint = '/heroes:get'
        const databaseMock = [{
            "id": "a44e446b-34bf-46ae-9016-a795321007d3",
            "name": "Peter",
            "age": 20,
            "power": "spider"
        }]

        const heroServiceStub = {
            find: async () => databaseMock
        }
        const endpoints = routes({ heroService: heroServiceStub })
        const request = {}
        const response = {
            write: CallTracker.calls(fn => {
                const expected = JSON.stringify({ results: databaseMock })
                assert.strictEqual(fn, expected, 'write should be called with the correct payload')
            }),
            end: CallTracker.calls(fn => {
                assert.strictEqual(fn, undefined)
            })
        }
        await endpoints[endpoint](request, response)
    })

    //post
    await t.todo('it should call /heroes:post route')
})