export default () => ({
  port: process.env.PORT || 8080,
  database: process.env.DATABASE_URL,
});
