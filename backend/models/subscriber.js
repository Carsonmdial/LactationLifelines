module.exports = (sequelize, DataTypes) => {
    const Subscriber = sequelize.define('Subscriber', {
      subscriber_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      total_subscriptions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      total_subscription_time: {
        type: DataTypes.STRING,  // Storing as ISO 8601 duration string
        allowNull: false,
        defaultValue: 'P0D',  // ISO 8601 duration format for 0 days
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  
    return Subscriber;
  };
  