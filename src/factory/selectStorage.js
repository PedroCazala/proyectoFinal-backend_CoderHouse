let instance = null

export class SelectStorage{
    constructor (storage) {
        this.persistencia = storage;
    }
    static storage(persistencia){
        this.persistencia = persistencia//.toLowerCase()
        return this.persistencia
    }

    static devolverPersistencia() {
        return this.persistencia
    }

    static getInstance(){
        if(!instance){
            instance = new SelectStorage()
        }
        return instance
    }

}