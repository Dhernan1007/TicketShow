const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        stars: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        }
    },
        {
            timestamps: false,
        }
    );
};