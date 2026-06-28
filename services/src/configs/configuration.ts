export default () => ({
  port: process.env.PORT || 8080,
  database: process.env.DATABASE_URL,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DB: process.env.REDIS_DB,
});
