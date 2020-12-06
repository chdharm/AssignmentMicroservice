const Assigment = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Assignment = sequelize.define('Assignment', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  });

  return Assignment;
};

module.exports = Assigment;
