export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV,
  mongodb: process.env.MONGODB,
  port: process.env.PORT,
  database: process.env.DATABASE,
  defaultLimit: process.env.DEFAULT_LIMIT,
  jwtSecret: process.env.JWT_SECRET,
});
