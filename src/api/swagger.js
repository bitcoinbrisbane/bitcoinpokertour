// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Swagger definitions
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bitcoin Poker Tour API",
      version: "1.0.0",
      description: "API documentation for Bitcoin Poker Tour",
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Local development server"
      }
    ],
    components: {
      schemas: {
        Event: {
          type: "object",
          required: [
            "title",
            "description",
            "date",
            "location",
            "start_stack",
            "blind_levels",
            "game_type",
            "buy_in"
          ],
          properties: {
            title: { 
              type: "string", 
              example: "Sunday Bitcoin Tournament" 
            },
            description: { 
              type: "string", 
              example: "Weekly Sunday tournament with Bitcoin prizes" 
            },
            date: { 
              type: "string", 
              format: "date-time", 
              example: "2024-04-07T14:00:00.000Z" 
            },
            registration_close: { 
              type: "string", 
              format: "date-time", 
              example: "2024-04-07T13:00:00.000Z" 
            },
            location: { 
              type: "string", 
              example: "Sydney, NSW" 
            },
            start_stack: { 
              type: "number", 
              example: 10000 
            },
            blind_levels: { 
              type: "number", 
              example: 20 
            },
            game_type: { 
              type: "string", 
              example: "NLHE" 
            },
            buy_in: { 
              type: "number", 
              example: 0.001 
            },
            fee: { 
              type: "number", 
              example: 0.0002 
            },
            max_players: { 
              type: "number", 
              example: 9,
              default: 0 
            }
          }
        },
        Result: {
          type: "object",
          properties: {
            event_id: { type: "string" },
            name: { type: "string" },
            place: { type: "number" },
            payout: { type: "number" }
          }
        }
      }
    }
  },
  apis: ["./src/api/routes/*.js"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
