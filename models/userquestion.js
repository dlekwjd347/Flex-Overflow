module.exports = function (sequelize, DataTypes) {
    let Post = sequelize.define("userQuestion", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Post;
};
