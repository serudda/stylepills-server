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
    social: Social
    about: String
    email: String
    website: String
    uiComponents: [UiComponent]
}
`;
//# sourceMappingURL=user.type.js.map