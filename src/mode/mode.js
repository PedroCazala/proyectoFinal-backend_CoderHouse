import {argv} from '../../server.js'
import cluster from 'cluster'
import { cpus } from 'os'
import { logger, loggerFile } from '../logs/log4js.js'

const mode = ()=>{
    const modo = argv.modo|| false
    if (modo !== false) {        
        logger.info(`Entró al modo ${modo}`)
        if(modo == 'CLUSTER'){
            const numCPUs = cpus().length
            if(cluster.isPrimary){
                logger.info('es master');
                for (let i = 0; i < numCPUs; i++) {
                    cluster.fork()
                }
                cluster.on('exit',(worker,code,signal) => {
                    logger.info(`Worker is died ${worker.process.pid}`);
                })
                logger.info({modo, mensaje:'entro a modo cluster'});

            }else{
                logger.info('NO es master',process.pid);
            }
        }
    }else{
        logger.info(`El modo está seteado en ${modo}`)
    }
}

export {mode}