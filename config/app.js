const AppConfig = {
    PORT: 4444,
    POSTGRES_DB: {
        DATABASENAME: 'demonode',
        USERNAME: 'postgres',
        PASSWORD: 'nibles1504',
        HOST: 'localhost',
        PORT: 5432,
        DIALECT: 'postgres',
    },
    MONGO_DB: {
        HOST: 'localhost',
        PORT: 27017,
        DBNAME: "demonode"
    },
    JWT_KEY: "myKey"
};

module.exports = AppConfig;