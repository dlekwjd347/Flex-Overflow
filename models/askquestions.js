module.exports = function (sequelize, DataTypes) {
    const AskQuestions = sequelize.define("AskQuestions", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return AskQuestions;
};
