module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
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
