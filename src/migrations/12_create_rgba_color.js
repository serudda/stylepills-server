'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('rgba_color', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            r: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            g: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            b: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 255
            },
            a: {
                type: Sequelize.DECIMAL(10,2),
                allowNull: false,
                defaultValue: 1
            },
            colorId: {
                type: Sequelize.INTEGER,
                field: 'color_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'color',
                    key: 'id',
                    as: 'color_id',
                }
            },
        }, {
            tableName: 'rgba_color',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('rgba_color');
    }
};