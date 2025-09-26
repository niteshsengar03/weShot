import dotenv from "dotenv";

type serverconfig = {
  PORT: number;
  REDIS_PORT: number;
  REDIS_HOST: string;
  MAIL_PASSWORD: string;
  MAIL_USER: string;
};

function loadEnv() {
  dotenv.config();
}

loadEnv();
const serverConfig: serverconfig = {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
   MAIL_PASSWORD:process.env.MAIL_PASSWORD || "you gmail app password",
    MAIL_USER:process.env.MAIL_USER || "user@gmail.com"
};

export default serverConfig;
