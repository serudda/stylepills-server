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
    avatar: String
    about: String
    email: String
    website: String
    atoms: [Atom]
}
`;
//# sourceMappingURL=user.type.js.map