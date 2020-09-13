//sarah's question model with associate: each question has many answers 

module.exports = function (sequelize, DataTypes) {
    const userQuestions = sequelize.define("userQuestions", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    });

    userQuestions.associate = function(models){
        userQuestions.hasMany(models.userAnswers, {
            onDelete: "cascade"
        });
    };
    return userQuestions;
};
