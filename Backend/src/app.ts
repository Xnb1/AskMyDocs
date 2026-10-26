import { env } from "./config/env.js";
import express from "express";
import cors from "cors";

// import dotenv from "dotenv";
// dotenv.config();
import chatRoutes from "./routes/chat.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors({ origin: env.clientUrl }));

app.use(express.json( {limit: "1mb"}));

app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentsRoutes);

app.use(errorHandler);

export default app;














