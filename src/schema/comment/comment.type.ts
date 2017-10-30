/********************************/
/*         COMMENT TYPE         */
/********************************/

export const typeDef = `
type Comment {
    id: ID!
    content: String
    commentable: String
    commentableId: Number
    active: Boolean
    author: User!
    createdAt: String
    updatedAt: String
}
`;

/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento). 
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */