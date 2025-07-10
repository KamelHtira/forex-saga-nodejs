const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// const cors = require("cors");
const routes = require("./routes");
require("./seeds/seedAdmin");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
// app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// // Rate limiter middleware
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Logging
morgan.token("authorization", (req) => req.headers["authorization"] || "-");
app.use(
  morgan(
    "[Log] :method :url :status :response-time ms - :res[content-length]"
  )
);

// MongoDB connection
mongoose
  .connect("mongodb+srv://kamel:kamel@cluster0.wejj0ir.mongodb.net/forex_saga")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kamel Forex Saga API",
      version: "1.0.0",
      description: "API documentation for Kamel Forex Saga",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    "./routes/strategy.js",
    "./routes/auth.js",
    "./routes/machine.js",
    "./routes/strategyInstance.js",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use main API routes
app.use("/api", routes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Error handler for async/await
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
