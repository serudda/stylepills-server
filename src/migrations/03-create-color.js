'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('color', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            label: {
                type: Sequelize.STRING,
                allowNull: true
            },
            hex: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            colorPaletteId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'ColorPalette',
                    key: 'id',
                    as: 'colorPaletteId',
                }
            }
        }, {
            tableName: 'color',
            freezeTableName: true,
        });
    },
    down: (queryInterface /* , Sequelize */) => {
        return queryInterface.dropTable('color');
    }
};