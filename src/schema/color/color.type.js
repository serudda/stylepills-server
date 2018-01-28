"use strict";
/************************************/
/*               TYPE               */
/************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDef = `

type Color {
    id: ID!
    name: String!
    hex: String
    rgba: RgbaColor
    type: String
    active: Boolean
}
`;
/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento).
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */ 
//# sourceMappingURL=color.type.js.map