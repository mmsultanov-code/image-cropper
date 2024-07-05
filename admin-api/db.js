const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'newtemptestbase',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'root',
    port: process.env.DB_PORT || 5432,
});

const initializeDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
        await initializeSeeders();
    } catch (error) {
        console.error('Unable to synchronize the models:', error);
    }
};

const initializeSeeders = async () => {
    const seedersPath = path.join(__dirname, 'seeders');
    const files = fs.readdirSync(seedersPath);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const seeder = require(path.join(seedersPath, file));
            if (seeder && typeof seeder.up === 'function') {
                try {
                    await seeder.up(sequelize.getQueryInterface(), Sequelize);
                    console.log(`Seeder ${file} executed successfully.`);
                } catch (error) {
                    console.error(`Error executing seeder ${file}:`, error);
                }
            }
        }
    }
};

// initializeDatabase();

module.exports = { sequelize, initializeDatabase };