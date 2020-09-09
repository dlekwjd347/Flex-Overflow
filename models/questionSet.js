module.exports = function(sequelize, DataTypes) {
    var questionSet = sequelize.define("questionSet", {
      question: {
        type: DataTypes.STRING,
      },
      answer: {
        type: DataTypes.TEXT,
      },
      example: {
        type: DataTypes.TEXT,
      }
    }, {
        timestamps: false //gets rid of createdAt and updatedAt columns, if not will have to provide values for columns when seeding with data 
    });
    return questionSet;
  };