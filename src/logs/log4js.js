import log4js from "log4js"

log4js.configure({
    appenders: {
      miLoggerConsole: { type: "console" },
      miLoggerFileError: { type: 'file', filename: 'error.log' },
    },
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "info" },
        consola: { appenders: ["miLoggerConsole"], level: "info" },
        archivoErrores: {appenders:["miLoggerFileError"],level: "warn"}
    }
})

export const logger = log4js.getLogger();
export const loggerFile = log4js.getLogger('archivoErrores');

// logger.info('algo por consola')
// loggerFile.info('Prueba de logger file con info (no debería guardarse)')
// loggerFile.warn('Prueba de logger file con warn')
// loggerFile.error('Prueba de logger file con error')