import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import signalRouter from "./routes/signal.route.js";
import insightRouter from "./routes/insight.route.js";

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/signals", signalRouter)
app.use("/api/v1/insights", insightRouter)

// Global error handler — serializes ApiError to JSON
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        statusCode,
        message: err.message || "Something went wrong",
        success: false,
        errors: err.errors || [],
    });
});

export { app };
