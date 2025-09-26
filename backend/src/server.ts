import express from "express";
import { Express } from "express";
import cors from "cors";
import serverConfig from "./config/index";
import V1Router from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger.config";
import { attachCorrelationIdMiddleware } from "./middlewares/correlation.middleware";
import { setupMailerWorker } from "./processor/email.processor";


const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use(attachCorrelationIdMiddleware);
app.use("/api/v1", V1Router);

app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  logger.info(`Port is running on http://localhost:${serverConfig.PORT}`);
  logger.info(`Press Cnt+C to exist`, { server: "dev server" });
  setupMailerWorker();
  logger.info(`Mailer worker setup completed`);
});
