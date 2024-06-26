module.exports = (sequelize, DataTypes) => {
    const BugReport = sequelize.define('BugReport', {
      bug_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Open',
      },
      reported_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reported_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_ip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  
    return BugReport;
  };
  