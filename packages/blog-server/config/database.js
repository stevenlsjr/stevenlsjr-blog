module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST',  undefined),
        database: env('DATABASE_NAME', 'blog'),
        port: env('DATABASE_PORT',  5432),
        user: env('DATABASE_USER',  'blog'),
        password: env('DATABASE_PASSWORD',  undefined),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
