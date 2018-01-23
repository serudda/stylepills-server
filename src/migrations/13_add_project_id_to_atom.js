'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('atom', 
        'project_id', {
            type: Sequelize.INTEGER,
            field: 'project_id',
            onDelete: 'CASCADE',
            references: {
                model: 'project',
                key: 'id',
                as: 'project_id',
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('atom', 'project_id');
    }
};