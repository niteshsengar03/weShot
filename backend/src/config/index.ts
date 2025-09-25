import dotenv from 'dotenv';

type serverconfig = {
    PORT:number;
}


function loadEnv(){ 
    dotenv.config();
}

loadEnv();
 const serverConfig:serverconfig = {
    PORT: Number(process.env.PORT) || 3001
}

export default serverConfig;


