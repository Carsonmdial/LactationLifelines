module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
      owner_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT,
      },
      skills: {
        type: DataTypes.TEXT,
      },
      certifications: {
        type: DataTypes.TEXT,
      },
    });
  
    return Owner;
  };