export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    name: process.env.DB_NAME || 'chatopia',
    uri: process.env.MONGO_URI || '',
  },
  jwt: {
    accessKey: process.env.JWT_ACCESS_KEY,
    refreshKey: process.env.JWT_REFRESH_KEY,
    accessExpire: process.env.JWT_ACCESS_EXPIRE || 24 * 60 * 60 * 1000, // 1 day
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || 30 * 24 * 60 * 60 * 1000, // 7 days
  },
  origins: (process.env.ORIGINS && process.env.ORIGINS.split(',')) || [],
});
