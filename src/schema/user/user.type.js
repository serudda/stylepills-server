"use strict";
/********************************/
/*           USER TYPE          */
/********************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `
type User {
    id: ID!
    firstname: String
    lastname: String
    username: String!
    email: String!
    avatar: String
    about: String
    website: String
    atoms: [Atom]
}
`;
// NOTE: El usuario no deberia ver la propiedad 'active' 
//# sourceMappingURL=user.type.js.map