import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 3002,
  MONGO_URI: process.env.MONGO_URI as string,
  MONGO_DBNAME: process.env.MONGO_DBNAME as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
