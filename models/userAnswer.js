//sarah's answer model: each answer belongs to one question

module.exports = function (sequelize, DataTypes) {
    const UserAnswer = sequelize.define("UserAnswer", {

        question_id: {
<<<<<<< HEAD
            type: DataTypes.INT,
            allowNull: false,
=======
        type: DataTypes.INT,
        allowNull: false,
>>>>>>> 5feba26388056d344f7064ed337fc00a4349753a
        },
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
