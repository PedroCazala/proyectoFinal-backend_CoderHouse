import mongoose  from 'mongoose'
import { logger } from '../logs/log4js';

export class MongoDbContainer{
}
export function connectMongoDB(){
    //conectar a la base de datos
    try {
        mongoose.connect(`mongodb+srv://pedro:${process.env.MONGO_PASSWORD}@cluster0.tugf9.mongodb.net/proyectoFinal?retryWrites=true&w=majority` /* || `mongodb://localhost:27017/proyectoFinal` */, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },()=> logger.info("Conectado a MongoDB"));
    } catch (error) {
        logger.info(error);
    }
}