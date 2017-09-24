/********************************/
/*           USER TYPE          */
/********************************/

export const typeDef = `
type User {
    id: ID!
    firstname: String
    lastname: String
    avatar: String
    social: Social
    about: String
    email: String
    website: String
    uiComponents: [UiComponent]
}
`;