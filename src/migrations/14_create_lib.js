'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('lib', {
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
            url: {
                type: Sequelize.STRING,
                allowNull: false
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
            atomId: {
                type: Sequelize.INTEGER,
                field: 'atom_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'atom',
                    key: 'id',
                    as: 'atom_id',
                }
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
            tableName: 'lib',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('lib');
    }
};