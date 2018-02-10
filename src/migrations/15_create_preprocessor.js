'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('preprocessor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            compileTo: {
                type: Sequelize.STRING,
                field: 'compile_to',
                allowNull: false
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
            tableName: 'preprocessor',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('preprocessor');
    }
};