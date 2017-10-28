/************************************/
/*             ATOM TYPE            */
/************************************/

export const typeDef = `
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