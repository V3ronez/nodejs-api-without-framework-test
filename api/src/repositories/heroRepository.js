import { readFile, writeFile } from 'node:fs/promises'
export default class HeroRepository {
    constructor({ file }) {
        this.file = file
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#currentFileContent();
    }

    async create(data) {
        const currentFile = await this.#currentFileContent()
        currentFile.push(data);

        await writeFile(this.file, JSON.stringify(currentFile))
        return data.id
    }
}

// const heroRepo = new HeroRepository({
//     file: '../../database/db.json'
// })

// console.log(await heroRepo.create({
//     id: 2,
//     name: 'flash',
// }))
// console.log(await heroRepo.find());