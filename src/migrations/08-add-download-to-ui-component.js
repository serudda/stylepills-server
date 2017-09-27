'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn(
                'uiComponent',
                'download',
                {
                    type: Sequelize.TEXT,
                    allowNull: true
                }
            ),
        ];
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('uiComponent', 'download');
    }
};


/* 
Add and Remove several columns

They are promises, I would launch one, and inside the 'then', launch the another one
return queryInterface.removeColumn('users', 'email').then(function () {
  return queryInterface.removeColumn('users', 'encryptedPassword');
});

reference: https://github.com/sequelize/cli/issues/133

*/