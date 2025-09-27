import dotenv from "dotenv";

type serverconfig = {
  PORT: number;
  MAIL_PASSWORD: string;
  MAIL_USER: string;
  REDIS_CONECTION:string;
};

function loadEnv() {
  dotenv.config();
}

loadEnv();
const serverConfig: serverconfig = {
  PORT: Number(process.env.PORT) || 3001,
   MAIL_PASSWORD:process.env.MAIL_PASSWORD || "you gmail app password",
    MAIL_USER:process.env.MAIL_USER || "user@gmail.com",
    REDIS_CONECTION:process.env.REDIS_CONECTION || "give you redis connection pool"
};

export default serverConfig;
