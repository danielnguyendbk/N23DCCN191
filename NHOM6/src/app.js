const express = require("express");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");
const studentRoutes = require("./routes/student.routes");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Logger middleware
app.use(logger);

// Health check
app.get("/", (req, res) => {
  res.json({ success: true, message: "Student API is running" });
});

// Routes
app.use("/api/students", studentRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (must be last)
app.use(errorHandler);

module.exports = app;
