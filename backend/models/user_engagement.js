module.exports = (sequelize, DataTypes) => {
    const user_engagement = sequelize.define('user_engagement', {
      engagement_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      average_session_length: {
        type: DataTypes.STRING,  // Storing as ISO 8601 duration string
        allowNull: false,
      },
      average_time_on_page: {
        type: DataTypes.STRING,  // Storing as ISO 8601 duration string
        allowNull: false,
      },
      average_clicks_per_session: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      most_clicked_element: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      timestamps: false  // Disable timestamps
  });
  
    return user_engagement;
  };
  