"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apolloError = require('apollo-errors');
/**
 * @desc Error constants: this constants help us to mask any kind of error in the App
 * @type constants
 */
// Mask any internal errors
exports.UnknownError = apolloError.createError('UnknownError', {
    message: 'An unknown error has occurred'
});
// User should be logged in but isn't
exports.UnauthorizedError = apolloError.createError('UnauthorizedError', {
    message: 'You must login to do that'
});
// User is already logged in
exports.AlreadyAuthenticatedError = apolloError.createError('AlreadyAuthenticatedError', {
    message: 'You are already authenticated'
});
// User is trying to perfomr an admin function
exports.ForbiddenError = apolloError.createError('ForbiddenError', {
    message: 'You are not allowed to do that'
});
//# sourceMappingURL=errors.js.map