'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('project', 
        'logo_url', {
            type: Sequelize.TEXT,
            field: 'logo_url',
            allowNull: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('project', 'logo_url');
    }
};