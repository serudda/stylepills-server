"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/****************************************/
/*            DATABASE CONFIG           */
/****************************************/
exports.default = {
    username: null,
    password: null,
    database: 'stylepills-dev',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: true
};
/* Esta linea es necesaria para poder correr el comando:
    sequelize db:migrate
Ya que este comando busca en .sequelizerc la configuración que le hayamos
establecido (database-config.js)
*/
// module.exports = databaseConfig; 
//# sourceMappingURL=database-config.js.map