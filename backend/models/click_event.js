module.exports = (sequelize, DataTypes) => {
    const ClickEvent = sequelize.define('ClickEvent', {
      click_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Sessions',
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
    });
  
    return ClickEvent;
  };
  