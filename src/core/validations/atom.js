"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const Validator = require("validator");
const lodash_1 = require("lodash");
/******************************************/
/*         VALIDATE INPUTS (ATOM)         */
/******************************************/
/**
 * @desc Validate fields on Atom Form fields
 * @function validateBasicFields
 * @param {AtomFormFields} field - atom form fields
 * @returns {IValidationResponse} errors, isValid
 */
function validateFields(field) {
    let errors = {};
    /* Author Id */
    if (!field.authorId) {
        errors.authorId = 'Author is required';
    }
    /* Atom Name */
    if (Validator.isEmpty(field.name)) {
        errors.name = 'This field is required';
    }
    /* Atom Html */
    if (Validator.isEmpty(field.html)) {
        errors.html = 'This field is required';
    }
    /* Atom Css */
    if (Validator.isEmpty(field.css)) {
        errors.css = 'This field is required';
    }
    /* Atom contextual background */
    if (!Validator.isHexColor(field.contextualBg)) {
        errors.contextualBg = 'Context background should be Hex color';
    }
    /* Project parent id */
    if (field.projectId === 0) {
        errors.projectId = 'Project associated does not exist';
    }
    /* Atom category */
    if (field.atomCategoryId === 0) {
        field.atomCategoryId = null;
    }
    /* Is private */
    if (field.private === null) {
        errors.private = 'Private is required';
    }
    return {
        errors,
        isValid: lodash_1.isEmpty(errors)
    };
}
exports.validateFields = validateFields;
//# sourceMappingURL=atom.js.map