
const {sequelize} = require('./sequelize_initiate')

const syncDatabase = async () => {
    try {
        await sequelize.sync(); // This will create tables if they don't exist
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to create tables:', error);
    }
};

module.exports = syncDatabase;