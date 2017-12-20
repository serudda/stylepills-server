'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('atom', 
        'duplicated', {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('atom', 'duplicated');
    }
};