module.exports = (sequelize, DataTypes) => {
    const page_view = sequelize.define('page_view', {
      view_id: {
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
      scroll_depth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      timestamps: false  // Disable timestamps
  });
  
    return page_view;
  };
  