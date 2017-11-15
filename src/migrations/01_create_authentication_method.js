'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('authentication_method', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            externalId: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'external_id'
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            token: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: true
            },
            displayName: {
                type: Sequelize.STRING,
                field: 'display_name',
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            userId: {
                type: Sequelize.INTEGER,
                field: 'user_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'user',
                    key: 'id',
                    as: 'user_id',
                }
            }
        }, {
            tableName: 'authentication_method',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('authentication_method');
    }
};