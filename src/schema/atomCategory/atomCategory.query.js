"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const index_1 = require("./../../models/index");
const logger_1 = require("./../../core/utils/logger");
/**************************************/
/*            QUERY TYPEDEF           */
/**************************************/
exports.typeDef = `
    extend type Query {
        atomCategoryById(id: ID!): AtomCategory!
        allAtomCategories: [AtomCategory!]!
    }
`;
/*******************************************/
/*              QUERY RESOLVER             */
/*******************************************/
exports.resolver = {
    Query: {
        /**
         * @desc Get all Atom's categories
         * @method Method allAtomCategories
         * @public
         * @returns {Array<IAtomCategory>} Atom's categories list
         */
        allAtomCategories() {
            // LOG
            logger_1.logger.log('info', 'Query: allAtomCategories');
            return index_1.models.AtomCategory.findAll({
                where: {
                    active: true
                }, raw: true
            });
        }
    },
    AtomCategory: {
        atoms(atomCategory) {
            // LOG
            logger_1.logger.log('info', 'Query (AtomCategory): getAtoms');
            return atomCategory.getAtoms();
        }
    }
};
//# sourceMappingURL=atomCategory.query.js.map