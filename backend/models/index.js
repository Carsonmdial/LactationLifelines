const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();  // Load environment variables

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env file');
}

console.log('Connecting to database:', databaseUrl);  // Add this line to debug

const sequelize = new Sequelize(databaseUrl, {
  dialect: process.env.DB_DIALECT || 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.owner = require('./owner')(sequelize, DataTypes);
db.resource = require('./resource')(sequelize, DataTypes);
db.subscriber = require('./subscriber')(sequelize, DataTypes);
db.session = require('./session')(sequelize, DataTypes);
db.page_view = require('./page_view')(sequelize, DataTypes);
db.click_event = require('./click_event')(sequelize, DataTypes);
db.subscription_history = require('./subscription_history')(sequelize, DataTypes);
db.email_engagement = require('./email_engagement')(sequelize, DataTypes);
db.user_engagement = require('./user_engagement')(sequelize, DataTypes);
db.feedback = require('./feedback')(sequelize, DataTypes);
db.bug_report = require('./bug_report')(sequelize, DataTypes);

module.exports = db;
