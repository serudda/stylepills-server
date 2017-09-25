'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn(
                'uiComponent',
                'authorId',
                {
                    type: Sequelize.INTEGER,
                    onDelete: 'CASCADE',
                    references: {
                        model: 'user',
                        key: 'id',
                        as: 'authorId',
                    }
                }
            ),
            queryInterface.addColumn(
                'uiComponent',
                'background',
                {
                    type: Sequelize.STRING,
                    allowNull: true
                }
            ),
        ];
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('uiComponent', 'authorId').then(
            () => {
                return queryInterface.removeColumn('uiComponent', 'background')
            }
        );
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