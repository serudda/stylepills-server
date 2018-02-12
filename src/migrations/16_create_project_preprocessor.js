'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('project_preprocessor', {
            projectId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'project_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'project',
                    key: 'id',
                    as: 'project_id',
                }
            },
            preprocessorId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'preprocessor_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'preprocessor',
                    key: 'id',
                    as: 'preprocessor_id',
                }
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
            tableName: 'project_preprocessor',
            freezeTableName: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('project_preprocessor');
    }
};