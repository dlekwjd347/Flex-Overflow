//sarah's question model with associate: each question has many answers 

module.exports = function (sequelize, DataTypes) {
    const UserQuestion = sequelize.define("UserQuestion", {
        // title: {
        //     type: DataTypes.TEXT,
        //     allowNull: false,
        // },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        }

    });

    UserQuestion.associate = function(models){
        UserQuestion.hasMany(models.UserAnswer, {
            onDelete: "cascade"
        });
    };
    return UserQuestion;
};
