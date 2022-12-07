// import HeroRepository from "../repositories/heroRepository.js";

export default class HeroService {
    constructor({ heroRepository }) {
        this.heroRepository = heroRepository
    }

    find() {
        return this.heroRepository.find()
    }

    create(data) {
        return this.heroRepository.create(data)
    }
}
// const heroRepository = new HeroRepository({ file: '../../database/db.json' })
// const heroService = new HeroService({ heroRepository });
// console.log(heroService.create({
//     name: 'batman da silva',
//     power: 'rico'
// }))

// console.log(await heroService.find());