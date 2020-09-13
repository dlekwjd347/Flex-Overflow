//johnson's question model

module.exports = function (sequelize, DataTypes) {
    const AskQuestions = sequelize.define("AskQuestions", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return AskQuestions;
};