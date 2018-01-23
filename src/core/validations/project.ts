/************************************/
/*           DEPENDENCIES           */
/************************************/
import { isEmpty } from 'lodash';
import * as Validator from 'validator';

import { functionsUtil } from './../utils/functionsUtil';

import { IColor as IColorModel, ColorTypeOptions } from './../../models/color.model';

// -----------------------------------

/******************************************/
/*            FORM INTERFACES             */
/******************************************/

/* Project form fields */
export type ProjectFormFields = {
    authorId: number,
    name: string,
    website?: string,
    description?: string,
    colorPalette: Array<IColorModel>,
    projectCategoryId: number,
    private: boolean
};

/* Message error of each field */
export interface IValidationError {
    authorId?: string;
    name?: string;
    website?: string;
    colorPalette?: string;
    projectCategoryId?: string;
    private?: string;
}

/* Validation response */
export interface IValidationResponse {
    errors?: IValidationError; 
    isValid: boolean;
}


/******************************************/
/*        VALIDATE INPUTS (PROJECT)       */
/******************************************/

/**
 * @desc Validate fields on Project Form field
 * @function validateFields
 * @param {ProjectFormFields} field - project form fields
 * @returns {IValidationResponse} errors, isValid
 */
export function validateFields(field: ProjectFormFields): IValidationResponse {

    let errors: IValidationError = {};

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
    } else {
        if (!functionsUtil.valueExistsInArray(field.colorPalette, ColorTypeOptions.primary, 'type')) {
            errors.colorPalette = 'Primary color is required';
        }
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