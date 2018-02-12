/************************************/
/*               TYPE               */
/************************************/

export const typeDef = `
type Project {
    id: ID!
    name: String
    website: String
    description: String
    colorPalette: [Color]
    libs: [Lib]
    preprocessors: [Preprocessor]
    sources: [Source]
    atoms: [Atom]
    active: Boolean
    private: Boolean
    author: User!
    category: ProjectCategory!
}
`;

/* NOTE: Ponemos todas sus propiedades, hasta sus objetos anidados (si los necesito traer en algun momento). 
    al final cuando voy a hacer la Query, ahi omito las propiedades que no necesito, ejemplo: active, createdAt, etc */