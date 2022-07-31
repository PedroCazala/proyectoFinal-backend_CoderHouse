
let instance = null
export let persistencia = 'mongo'

export class SelectStorage{
    constructor (storage) {
        this.persistencia = 'memory';
    }
    static storage(persistencia){
        persistencia = persistencia//.toLowerCase()
        console.log(`La persistencia ahora es ${persistencia}`);
        // return this.persistencia
    }

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