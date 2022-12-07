import http from 'node:http';
import handler from './handler.js';
const PORT = process.env.PORT || 3001

const server = http.createServer(handler).listen(PORT, () => console.log('\nServer runnig sir! ⚡️\n'))

export { server }