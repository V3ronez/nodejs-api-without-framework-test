import Hero from "../entities/Hero.js"
import { once } from 'node:events'
import { DEFAULT_HEADER } from "../util/util.js"


const routes = ({ heroService }) => ({
    '/heroes:get': async (req, res) => {
        const heroes = await heroService.find()
        res.write(JSON.stringify({ results: heroes }))
        return res.end()
    },

    '/heroes:post': async (req, res) => {
        const data = await once(req, 'data')
        const dataParse = JSON.parse(data)
        const hero = new Hero(dataParse)
        const id = await heroService.create(hero)

        res.writeHead(201, DEFAULT_HEADER)
        res.write(JSON.stringify({
            id, success: 'User created with success!'
        }))

        return res.end()
    },
})
export { routes } 