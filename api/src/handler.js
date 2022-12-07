import { dirname, join } from 'node:path'
import { fileURLToPath, parse } from 'node:url';
import { generateInstance } from './factories/heroFactory.js';
import { routes } from './routes/heroRoute.js';
import { DEFAULT_HEADER } from './util/util.js';

const currentDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currentDir, './../database', 'db.json')
const heroService = generateInstance({ filePath })
const heroRoutes = routes({ heroService })

const allRoute = {
    ...heroRoutes,
    default: (req, res) => {
        res.writeHead(404, DEFAULT_HEADER)
        res.write('not found!!')
        res.end()
    }
}

function handler(req, res) {
    const { url, method } = req
    const { pathname } = parse(url, true);
    const key = `${pathname}:${method.toLowerCase()}`
    const choosen = allRoute[key] || allRoute.default
    return Promise.resolve(choosen(req, res))
        .catch(handlerError(res))
}

function handlerError(res) {
    return error => {
        console.log('** something bad has happened ** \n', error.stack)
        res.writeHead(500, DEFAULT_HEADER);
        res.write(JSON.stringify({ error: 'internal error' }))
        return res.end();
    }
}


export default handler