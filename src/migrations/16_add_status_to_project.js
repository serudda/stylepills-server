'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('project', 
        'status', {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'NW'
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('project', 'status');
    }
};