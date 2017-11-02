"use strict";
/********************************/
/*           USER TYPE          */
/********************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `
type User {
    id: ID!
    username: String!
    firstname: String
    lastname: String
    email: String!
    password: String
    website: String
    avatar: String
    about: String
    active: Boolean
    atoms: [Atom] 
    createdAt: String
    updatedAt: String
}
`;
/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento).
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */
//# sourceMappingURL=user.type.js.map