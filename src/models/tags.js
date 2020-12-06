const Tags = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Tags = sequelize.define('Tags', {
    // Model attributes are defined here
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Tags.associate = (models) => {
    Tags.belongsTo(models.Assignment, {
      foreignKey: 'assignmentId',
    });
  };
  return Tags;
};

module.exports = Tags;
