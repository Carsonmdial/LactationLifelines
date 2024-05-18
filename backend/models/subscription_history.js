module.exports = (sequelize, DataTypes) => {
    const SubscriptionHistory = sequelize.define('SubscriptionHistory', {
      history_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subscriber_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Subscribers',
          key: 'subscriber_id',
        },
        onDelete: 'CASCADE',
      },
      subscribed_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      unsubscribed_at: {
        type: DataTypes.DATE,
      },
      subscription_length: {
        type: DataTypes.STRING,  // Storing as ISO 8601 duration string
        allowNull: true,
      },
    });
  
    return SubscriptionHistory;
  };
  