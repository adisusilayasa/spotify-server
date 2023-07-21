const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
        title: "Your Express API",
        version: "1.0.0",
        description: "Documentation for your Express API",
        },
        servers: [
        {
            url: "http://localhost:3000", // Replace with your API server URL
            description: "Development server",
        },
        ],
    },
    apis: ["./src/router/*.js", "./src/models/*.js"], // Add the paths to your route and model files
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    // Serve the Swagger UI at /api-docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    // Provide the JSON specifications at /swagger.json
    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpecs);
    });
};
