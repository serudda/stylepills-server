'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('atom', 
        'description', {
            type: Sequelize.TEXT,
            allowNull: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('atom', 'description');
    }
};