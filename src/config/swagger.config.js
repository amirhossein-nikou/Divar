const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc")
function swaggerConfig(app){
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition:{
            openapi:"3.1.0",
            info:{
                title: "Divar",
                description: "this is a backend project of divar",
                version: "1.0.0"
            }
        },
        apis: ["src/modules/**/*.swagger.js"]
    })
    const swagger = swaggerUi.setup(swaggerDocument,{})
    app.use("/swagger", swaggerUi.serve,swagger);
}
module.exports = swaggerConfig