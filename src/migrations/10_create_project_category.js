'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('project_category', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                field: 'created_at',
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                field: 'updated_at',
                allowNull: false
            }
        }, {
            tableName: 'project_category',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('project_category');
    }
};