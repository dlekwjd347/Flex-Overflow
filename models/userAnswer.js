//sarah's answer model: each answer belongs to one question

module.exports = function (sequelize, DataTypes) {
    const UserAnswer = sequelize.define("UserAnswer", {

        // question_id: {
        //     type: DataTypes.INT,
        //     allowNull: false,
        // },
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
