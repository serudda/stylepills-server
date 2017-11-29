'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('atom', 
        'owner_id', {
            type: Sequelize.INTEGER,
            field: 'owner_id',
            onDelete: 'CASCADE',
            references: {
                model: 'user',
                key: 'id',
                as: 'owner_id',
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('atom', 'owner_id');
    }
};