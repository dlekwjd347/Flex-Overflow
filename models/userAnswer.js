//sarah's answer model: each answer belongs to one question

module.exports = function (sequelize, DataTypes) {
    const UserAnswer = sequelize.define("UserAnswer", {
<<<<<<< HEAD
=======

        question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
>>>>>>> 5e968682483c99270f1089ecfc61d8094f4d1298
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    });

    UserAnswer.associate = function(models){
        UserAnswer.belongsTo(models.UserQuestion, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return UserAnswer;
};
