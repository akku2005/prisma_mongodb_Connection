const cookieParser = require("cookie-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const swaggerUi = require('swagger-ui-express');
const openApiSpec = require('./controllers/openapi.json');


// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Import and use userRouter
const userRouter = require("./routes/userRoutes");
app.use('/api', userRouter);

// Define a variable for the port, use 3000 as the default
const port = process.env.PORT || 3000;

// Define a basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req, res) => {
  res.send("Hi from Akash");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
