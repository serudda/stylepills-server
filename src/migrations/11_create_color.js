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
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            hex: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '#FFFFFF'
            },
            type: {
                type: Sequelize.STRING,
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
            },
            projectId: {
                type: Sequelize.INTEGER,
                field: 'project_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'project',
                    key: 'id',
                    as: 'project_id',
                }
            },
        }, {
            tableName: 'color',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('color');
    }
};