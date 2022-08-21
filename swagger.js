import { PORT } from "./server.js";

const optionsSwagger = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            description:
                `
                    Este es un proyecto de e-commerce desarrollado con NodeJS y ExpressJS.
                    El proyecto es una API de backend que te permite administrar tu tienda e-commerce.
                    Esta API esta basada en una arquitectura RESTful. Pero con vistas, usando el motor de plantillas EJS.
                    La persistencia de datos es por defecto con MongoAtlas, pero si le pasas como argumento por linea de comandos --storage puedes elegir entre filesystem,firebase,memory o (aunque no sea necesario especificarlo:)mongo.
                    Se utiliza Passport para autenticar las peticiones.

                `,
            version: "1.0.0",
        },
        servers: [
            {
                url:`http://localhost:8080`,
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

export default optionsSwagger;