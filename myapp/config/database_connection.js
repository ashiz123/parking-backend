const mysql = require('mysql2/promise');
const config = require('./database_config');

const env = process.env.NODE_ENV || 'development';


if(!config[env]){
    throw new Error(`Configuration for environment "${env}" is undefined.`)
}

console.log("NODE_ENV:", process.env.NODE_ENV);


const { username, password, database, host } = config[env];
console.log(username, password, database, host );

const pool = mysql.createPool({
    host: host,
    user: username,
    password: password,
    database: database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

   
});

// Check connection
const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        await connection.query('SELECT 1'); // Simple query to check the connection
        console.log('Connection to the database has been established successfully.');
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
};

// Call the check connection function
checkConnection();

module.exports = pool;