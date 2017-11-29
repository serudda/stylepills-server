const apolloError = require('apollo-errors');

/**
 * @desc Error constants: this constants help us to mask any kind of error in the App
 * @type constants
 */


// Mask any internal errors
export const UnknownError = apolloError.createError('UnknownError', {
    message: 'An unknown error has occurred'
});

// User should be logged in but isn't
export const UnauthorizedError = apolloError.createError('UnauthorizedError', {
    message: 'You must login to do that'
});

// User is already logged in
export const AlreadyAuthenticatedError = apolloError.createError('AlreadyAuthenticatedError', {
    message: 'You are already authenticated'
});

// User is trying to perfomr an admin function
export const ForbiddenError = apolloError.createError('ForbiddenError', {
    message: 'You are not allowed to do that'
});