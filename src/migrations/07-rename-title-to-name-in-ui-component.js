'use strict';
module.exports = {
    up: (queryInterface) => {
        return [
            queryInterface.renameColumn(
                'uiComponent', 
                'title', 
                'name'
            ),
        ];
    },

    down: (queryInterface) => {
        
        return queryInterface.renameColumn('uiComponent', 'name', 'title');
        
    }
};