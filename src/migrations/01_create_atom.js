'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('atom', {
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
            html: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            css: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            contextualBg: {
                type: Sequelize.STRING,
                field: 'contextual_bg',
                defaultValue: '#FFFFFF',
                allowNull: true
            },
            stores: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            views: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            likes: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            download: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
                allowNull: false
            },
            private: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
            },
            atomCategoryId: {
                type: Sequelize.INTEGER,
                field: 'atom_category_id',
                onDelete: 'CASCADE',
                references: {
                    model: 'atom_category',
                    key: 'id',
                    as: 'atom_category_id',
                }
            }
        }, {
            tableName: 'atom',
            freezeTableName: true,
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('atom');
    }
};