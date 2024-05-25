module.exports = (sequelize, DataTypes) => {
    const click_event = sequelize.define('click_event', {
      click_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'session_id',
        },
        onDelete: 'CASCADE',
      },
      element_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      page_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      timestamps: false  // Disable timestamps
  });
  
    return click_event;
  };
  