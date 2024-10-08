// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize_initiate');

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



// Export the User model
module.exports = User;