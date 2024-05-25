module.exports = (sequelize, DataTypes) => {
    const subscription_history = sequelize.define('subscription_history', {
      history_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subscriber_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'subscribers',
          key: 'subscriber_id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
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
    }, {
      timestamps: false  // Disable timestamps
  });
  
    return subscription_history;
  };
  