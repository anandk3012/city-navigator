// models/fareinfo.js
export default (sequelize, DataTypes) => {
  const FareInfo = sequelize.define('FareInfo', {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transportationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fare: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    verified: { // Indicates if the fare has been verified by AI
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return FareInfo;
};
