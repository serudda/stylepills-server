'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            lastname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true
            },
            website: {
                type: Sequelize.STRING,
                allowNull: true
            },
            avatar: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            about: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            isBetaMember: {
                type: Sequelize.BOOLEAN,
                field: 'is_beta_member',
                defaultValue: true,
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
            tableName: 'user',
            freezeTableName: true,
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('user');
    }
};