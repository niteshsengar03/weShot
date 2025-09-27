import Redis from "ioredis";
import serverConfig from ".";
import { InternalServerError } from "../utils/errors/app.error";

function connectToRedis() {
  try {
    let connection: Redis;

    return () => {
      if (!connection) {
        connection = new Redis(serverConfig.REDIS_CONECTION, {
          maxRetriesPerRequest: null,
        });
        return connection;
      }
      return connection;
    };
  } catch (err) {
    console.log("Error connecting to Redis", err);
    throw new InternalServerError("Failed to connect to Redis server");
  }
}

export const getRedisConnObject = connectToRedis();
