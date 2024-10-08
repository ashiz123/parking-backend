// config/database.js
const { Sequelize } = require('sequelize');
const config = require('./database_config');

const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];



const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    pool: {
        max: 5,         // Maximum number of connections in the pool
        min: 0,         // Minimum number of connections in the pool
        acquire: 30000, // Maximum time (in ms) to acquire a connection
        idle: 10000,    // Maximum time (in ms) a connection can be idle
    },
});

const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Try to authenticate the connection
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {sequelize, testConnection};