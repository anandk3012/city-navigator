// models/serviceinfo.js
export default (sequelize, DataTypes) => {
  const ServiceInfo = sequelize.define('ServiceInfo', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userRatings: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  });

  return ServiceInfo;
};
