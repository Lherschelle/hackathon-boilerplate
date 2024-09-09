const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

class FOI extends Model {}
FOI.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailAddress: DataTypes.STRING,
    about: DataTypes.STRING,
    enquiry: DataTypes.STRING,
    reference: DataTypes.STRING,
    confirmationEmailSent: DataTypes.BOOLEAN,
  },
  { sequelize, modelName: "FOI" },
);

module.exports = { sequelize, FOI };
