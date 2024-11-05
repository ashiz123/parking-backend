// loading environment variable from config file
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT,  
        dvla : process.env.DVLA_API_KEY
        
    },
    // Add configurations for other environments (test, production) as needed
};