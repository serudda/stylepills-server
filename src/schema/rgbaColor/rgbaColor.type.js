"use strict";
/************************************/
/*       PROJECT CATEGORY TYPE      */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `

type RgbaColor {
    id: ID!
    r: Int!
    g: Int!
    b: Int!
    a: Float
}
`;
/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento).
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */ 
//# sourceMappingURL=rgbaColor.type.js.map