"use strict";
/************************************/
/*             ATOM TYPE            */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `
type Atom {
    id: ID!
    name: String
    html: String
    css: String
    contextualBg: String
    stores: Int
    views: Int
    likes: Int
    comments: [Comment]
    download: String
    author: User!
}
`;
// NOTE: El usuario no deberia ver la propiedad 'active' ni 'private' 
//# sourceMappingURL=atom.type.js.map