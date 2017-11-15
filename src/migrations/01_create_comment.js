'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('comment', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            commentable: {
                type: Sequelize.STRING,
                allowNull: true
            },
            commentableId: {
                type: Sequelize.INTEGER,
                field: 'commentable_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'atom',
                    key: 'id',
                    as: 'commentable_id',
                }
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            authorId: {
                type: Sequelize.INTEGER,
                field: 'author_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'user',
                    key: 'id',
                    as: 'author_id',
                }
            }
        }, {
            tableName: 'comment',
            freezeTableName: true,
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('comment');
    }
};