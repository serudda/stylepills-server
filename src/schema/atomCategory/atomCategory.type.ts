/************************************/
/*        ATOM CATEGORY TYPE        */
/************************************/

export const typeDef = `

type AtomCategory {
    id: ID!
    name: String!
    description: String
    atoms: [Atom]
    active: Boolean
}
`;

/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento). 
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */