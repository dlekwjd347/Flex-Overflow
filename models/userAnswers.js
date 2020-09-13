//sarah's answer model: each answer belongs to one question // good

module.exports = function (sequelize, DataTypes) {
    const UserAnswers = sequelize.define("UserAnswers", {

        // question_id: {
        //     type: DataTypes.INT,
        //     allowNull: false,
        // },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    });

    UserAnswers.associate = function(models){
        UserAnswers.belongsTo(models.UserQuestions, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return UserAnswers;
};
