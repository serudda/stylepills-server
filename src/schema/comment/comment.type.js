"use strict";
/********************************/
/*         COMMENT TYPE         */
/********************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `
type Comment {
    id: ID!
    content: String
    commentable: String
    commentableId: Int
    active: Boolean
    author: User!
}
`;
/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento).
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */ 
//# sourceMappingURL=comment.type.js.map