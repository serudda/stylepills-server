"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const lodash_1 = require("lodash");
const Validator = require("validator");
const functionsUtil_1 = require("./../utils/functionsUtil");
const color_model_1 = require("./../../models/color.model");
/******************************************/
/*        VALIDATE INPUTS (PROJECT)       */
/******************************************/
/**
 * @desc Validate fields on Project Form field
 * @function validateFields
 * @param {ProjectFormFields} field - project form fields
 * @returns {IValidationResponse} errors, isValid
 */
function validateFields(field) {
    let errors = {};
    /* Author Id */
    if (!field.authorId) {
        errors.authorId = 'Author is required';
    }
    /* Project Name */
    if (Validator.isEmpty(field.name)) {
        errors.name = 'This field is required';
    }
    /* Project Website */
    if (!Validator.isEmpty(field.website)) {
        if (!Validator.isURL(field.website)) {
            errors.website = 'This website is not a valid url';
        }
    }
    /* Project's color palette */
    if (!field.colorPalette) {
        errors.colorPalette = 'Color palette is required';
    }
    else {
        if (!functionsUtil_1.functionsUtil.valueExistsInArray(field.colorPalette, color_model_1.ColorTypeOptions.primary, 'type')) {
            errors.colorPalette = 'Primary color is required';
        }
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
//# sourceMappingURL=project.js.map