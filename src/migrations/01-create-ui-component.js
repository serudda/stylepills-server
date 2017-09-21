'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('UiComponent', {
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
                type: Sequelize.STRING,
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
        });
    },
    down: (queryInterface /* , Sequelize */) => {
        return queryInterface.dropTable('UiComponent');
    }
};