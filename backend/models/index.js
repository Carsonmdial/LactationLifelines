const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
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