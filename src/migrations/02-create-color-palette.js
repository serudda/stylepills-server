'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('colorPalette', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			category: {
				type: Sequelize.STRING,
				allowNull: true
			},
			description: {
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
			},
			uiComponentId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'UiComponent',
					key: 'id',
					as: 'uiComponentId',
				}
			}
		}, {
            tableName: 'colorPalette',
            freezeTableName: true,
        });
	},
	down: (queryInterface /* , Sequelize */) => {
		return queryInterface.dropTable('colorPalette');
	}
};