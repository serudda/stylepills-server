"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************/
/*             COMMENT MODEL             */
/*****************************************/
function default_1(sequelize, dataTypes) {
    let Comment = sequelize.define('Comment', {
        content: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        commentable: {
            type: dataTypes.STRING
        },
        commentableId: {
            type: dataTypes.INTEGER,
            field: 'commentable_id'
        },
        active: {
            type: dataTypes.BOOLEAN
        }
    }, {
        timestamps: true,
        tableName: 'comment',
        freezeTableName: true
    });
    /*      CREATE RELATIONSHIP      */
    /*********************************/
    Comment.associate = (models) => {
        // one Comment belongs to one Atom (1:M)
        // NOTE: (1) constraints theory
        Comment.belongsTo(models.Atom, {
            foreignKey: {
                name: 'commentableId',
                field: 'commentable_id'
            },
            constraints: false,
            as: 'atom'
        });
        // one Comment belongs to one author (1:M)
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'authorId',
                field: 'author_id'
            }
        });
    };
    return Comment;
}
exports.default = default_1;
/*
 (1). reference: http://docs.sequelizejs.com/manual/tutorial/associations.html
 */ 
//# sourceMappingURL=comment.model.js.map