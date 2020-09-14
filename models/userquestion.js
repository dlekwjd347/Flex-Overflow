//sarah's question model with associate: each question has many answers 

module.exports = function (sequelize, DataTypes) {
    const UserQuestion = sequelize.define("UserQuestion", {
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    });

    UserQuestion.associate = function(models){
        UserQuestion.hasMany(models.UserAnswer, {
            onDelete: "cascade"
        });
    UserQuestion.belongsTo(models.User)
    };


    return UserQuestion;
};
