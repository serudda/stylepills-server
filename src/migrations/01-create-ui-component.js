'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('uiComponent', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true
            },
            html: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            css: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            scss: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            tableName: 'uiComponent',
            freezeTableName: true,
        });
    },
    down: (queryInterface /* , Sequelize */) => {
        return queryInterface.dropTable('uiComponent');
    }
};