module.exports = (sequelize, DataTypes) => {
    const email_engagement = sequelize.define('email_engagement', {
      engagement_id: {
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
      email_subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sent_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      open_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      click_rate: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    }, {
      timestamps: false  // Disable timestamps
  });
  
    return email_engagement;
  };
  