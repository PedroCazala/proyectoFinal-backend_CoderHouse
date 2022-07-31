import parseArgs from 'minimist';
import { logger } from '../logs/log4js.js';
export const argv = parseArgs(process.argv.slice(2))

let instance = null
let persistencia = argv.storage ||'mongo'
try {
    persistencia = persistencia.toLowerCase()
} catch (error) {
    logger.error('No se pudo pasar la persistencia a minúscula')
}

export class SelectStorage{
    constructor (storage) {
        this.persistencia = 'memory';
    }
    // static storage(persistencia){
    //     persistencia = persistencia//.toLowerCase()
    //     console.log(`La persistencia ahora es ${persistencia}`);
    //     // return this.persistencia
    // }

    static devolverPersistencia() {
        return persistencia
    }

    static getInstance(){
        if(!instance){
            instance = new SelectStorage()
        }
        return instance
    }

}