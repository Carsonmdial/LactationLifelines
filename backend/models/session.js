module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    session_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    pages_viewed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    session_length: {
      type: DataTypes.STRING,  // Storing as ISO 8601 duration string
      allowNull: true,
    },
    is_new_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    timestamps: false  // Disable timestamps
});

  return session;
};
