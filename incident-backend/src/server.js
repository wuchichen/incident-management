const express = require("express");
const app = express();
const cors = require("cors");
const { authenticateToken } = require("./middleware/authenticate");
const db = require("./db/mongodb");
const loginRouter = require("./route/login-route");
const registerRouter = require("./route/register-route");
const incidientRouter = require("./route/incident-route");

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors());

// Routes
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);

// Protected routes
app.use(authenticateToken);
app.use("/api/v1/incidents", incidientRouter);

// Run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Connecting to database`);
  await db.connect();
  console.log(`Database connected`);
});
