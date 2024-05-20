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

db.Owner = require('./owner')(sequelize, DataTypes);
db.Resource = require('./resource')(sequelize, DataTypes);
db.Subscriber = require('./subscriber')(sequelize, DataTypes);
db.Session = require('./session')(sequelize, DataTypes);
db.PageView = require('./page_view')(sequelize, DataTypes);
db.ClickEvent = require('./click_event')(sequelize, DataTypes);
db.SubscriptionHistory = require('./subscription_history')(sequelize, DataTypes);
db.EmailEngagement = require('./email_engagement')(sequelize, DataTypes);
db.UserEngagement = require('./user_engagement')(sequelize, DataTypes);
db.Feedback = require('./feedback')(sequelize, DataTypes);
db.BugReport = require('./bug_report')(sequelize, DataTypes);

module.exports = db;
