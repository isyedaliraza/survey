module.exports = (sequelize, DataTypes) => {
  const Survey = sequelize.define("Surveys", {
    title: DataTypes.STRING,
    questions: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue("questions"))
      },
      set: function (value) {
        return this.setDataValue("questions", JSON.stringify(value))
      },
    },
    isActive: DataTypes.BOOLEAN,
    expiryDate: DataTypes.DATE,
  })

  return Survey
}
