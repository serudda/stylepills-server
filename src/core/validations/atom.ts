/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as Validator from 'validator';
import { isEmpty } from 'lodash';


// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/

/* Atom form fields */
export type AtomFormFields = {
    authorId: number;
    name: string;
    description?: string;
    html: string;
    css: string;
    contextualBg: string;
    projectId: number | null;
    atomCategoryId: number | string;
    private: boolean;
};

/* Message error of each field */
export interface IValidationError {
    authorId?: string;
    name?: string;
    html?: string;
    css?: string;
    contextualBg?: string;
    projectId?: string;
    atomCategoryId?: string;
    private?: string;
}

/* Validation response */
export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*         VALIDATE INPUTS (ATOM)         */
/******************************************/

/**
 * @desc Validate fields on Atom Form fields
 * @function validateBasicFields
 * @param {AtomFormFields} field - atom form fields
 * @returns {IValidationResponse} errors, isValid
 */
export function validateFields(field: AtomFormFields): IValidationResponse {

    let errors: IValidationError = {};

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
        isValid: isEmpty(errors)
    };

}