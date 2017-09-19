'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Colors', {
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
        });
    },
    down: (queryInterface /* , Sequelize */) => {
        return queryInterface.dropTable('Colors');
    }
};