"use strict";
/********************************/
/*         COMMENT TYPE         */
/********************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `
type Comment {
    id: ID!
    content: String
    author: User!
}
`;
/* NOTE:
    - El usuario no deberia ver la propiedad 'active'
    - No necesito traer commentable y commentableId ya que por
    ejemplo, si me estoy trayendo un Atom, de una vez voy a traer
    sus comments, para que traerme commentableId si ya se que este
    comentario pertenece a este Atom.
*/ 
//# sourceMappingURL=comment.type.js.map