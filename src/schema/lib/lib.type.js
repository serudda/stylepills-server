"use strict";
/************************************/
/*               TYPE               */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `

# Input: TODO: Mover a lib.mutation cuando se haya creado

input LibInput {
    name: String!
    url: String
    type: String
}

type Lib {
    id: ID!
    name: String!
    url: String!
    type: String
    atom: Atom
    project: Project
    active: Boolean
}
`;
/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento).
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */ 
//# sourceMappingURL=lib.type.js.map