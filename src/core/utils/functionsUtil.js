"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/*           DEPENDENCIES           */
/************************************/
const appConfig = require("./../constants/app.constants");
const logger_1 = require("./logger");
/************************************/
/*         CLASS DEFINITION         */
/************************************/
class FunctionsUtil {
    constructor() { }
    /**********************************/
    /*            METHODS             */
    /**********************************/
    /**
     * @desc Encapsulate the idea of passing a new object as
     * the first parameter to Object.assign to ensure we correctly
     * copy data instead of mutating.
     * @function updateObject
     * @example - this.updateObject(state, {todos : newTodos});
     * @param {Object} oldObject - old object to update
     * @param {any} newValues - values or object to include in old object
     * @return {Object}
     */
    updateObject(oldObject, newValues = {}) {
        return Object.assign({}, oldObject, newValues);
    }
    /**
     * @desc Encapsulate the idea of copy an Array ensuring we
     * correctly copy data instead of mutating.
     * @function copyArray
     * @example - this.copyArray(array);
     * @param {Array<any>} array - old array to concat (or copy)
     * @param {Array<any>} newArray - new array to use to concat
     * @return {Array<any>}
     */
    copyArray(array) {
        return [].concat(array);
    }
    /**
     * @desc Encapsulate the idea of updating and item in an array
     * to ensure we correctly copy data instead of mutating.
     * @function updateItemInArray
     * @example
     * const newTodos = updateItemInArray(state.todos, 'id', action.id, todo => {
     *      return updateObject(todo, {completed : !todo.completed});
     * });
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    updateItemInArray(array, key = 'id', value, updateItemCallback) {
        const updatedItems = array.map(item => {
            if (item[key] !== value) {
                /* Since we only want to update one item,
                    preserve all others as they are now */
                return item;
            }
            // Use the provided callback to create an updated item
            const updatedItem = updateItemCallback(item);
            return updatedItem;
        });
        return updatedItems;
    }
    /**
     * @desc Encapsulate the idea of deleting and item in an array
     * to ensure we correctly copy data instead of mutating.
     * @function deleteItemInArray
     * @example
     * const newTodos = deleteItemInArray(state.todos, 'id', action.id);
     * @param {Array<any>} array - array of objects
     * @param {number | string} value - value to use to find item inside the array
     * @param {string} key - item identifier: e.g. id, uuid, etc.
     * @return {Array<any>}
     */
    deleteItemInArray(array, key = 'id', value) {
        const newList = array.filter((item) => {
            if (item[key] === value) {
                return false;
            }
            else {
                return true;
            }
        });
        return newList;
    }
    /**
     * @desc Validate if an item exists on an Array
     * @function itemExistsInArray
     * @example this.itemExistsInArray(array, 'primary', 'typeColor')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {boolean} value exists in array (true or false)
     */
    itemExistsInArray(array, value, key = null) {
        let res = false;
        if (array.length > 0) {
            let newArray = array.filter((elem) => {
                if (key) {
                    return elem[key] === value;
                }
                else {
                    return elem === value;
                }
            });
            if (newArray.length > 0) {
                res = true;
            }
        }
        return res;
    }
    /**
     * @desc Encapsulate the idea of deleting inner props an array
     * to ensure we correctly copy data instead of mutating.
     * @function deletePropInCollection
     * @example
     * const newTodos = deletePropInCollection(atom.todos, 'id', 'atomId', 'projectId');
     * @param {Array<any>} array - array of objects
     * @param {Array<string>} props - list of keys to delete e.g. 'id', 'atomId', 'projectId'
     * @return {Array<any>}
     */
    deletePropInCollection(array, ...keys) {
        const newCollection = array.filter((item) => {
            keys.forEach((key) => {
                delete item[key];
            });
            return true;
        });
        return newCollection;
    }
    /**
     * normalizeString
     * @description - replace special characters from a string
     * @use - this.FunctionsUtilService.normalizeString('Fábula Niño');
     * @function
     * @param {string} str - string to parse
     * @return {string} string parsed (e.g. Fabula Nino)
     */
    normalizeString(str) {
        // VARIABLES
        let from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
        let to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
        let mapping = {};
        for (let i = 0; i < from.length; i++) {
            mapping[from.charAt(i)] = to.charAt(i);
        }
        var ret = [];
        for (let i = 0; i < str.length; i++) {
            let c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) {
                ret.push(mapping[c]);
            }
            else {
                ret.push(c);
            }
        }
        return ret.join('');
    }
    /**
     * generateUsername
     * @description - generate a dynamic username
     * @use - this.FunctionsUtilService.generateUsername('sergio', 'ruiz);
     * @function
     * @param {string} firstName - entity first name
     * @param {string} lastName - entity last name
     * @return {string} username - username generated
     */
    generateUsername(firstName, lastName) {
        // VARIABLES
        let alias = '';
        let username = '';
        let randomCode = '';
        let minLength = appConfig.USERNAME_MIN_LENGTH;
        let maxLength = appConfig.USERNAME_MAX_LENGTH;
        // CONSTANTS
        let ALPHABET = '0123456789';
        let ID_LENGTH = 7;
        let REMAINDER = maxLength - ID_LENGTH;
        let EXTRAS = 2;
        // Replace characters special
        firstName = this.normalizeString(firstName);
        // remove space and other characters to firstName
        firstName = firstName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
        // Replace characters special
        lastName = this.normalizeString(lastName);
        // remove space and other characters to lastName
        lastName = lastName.replace(/[^\w\s]/gi, '').replace(/\s/g, '');
        /* Validate if firstname is longer than
            REMAINDER - EXTRAS (1 lastName letter + '-' character)*/
        if (firstName.length > REMAINDER - EXTRAS) {
            firstName = firstName.substring(0, REMAINDER - EXTRAS);
        }
        // Create Alias value
        alias = (firstName + lastName.substring(0, 1)).toLowerCase();
        // Generate random code if ID doesn't exist
        for (var i = 0; i < ID_LENGTH; i++) {
            randomCode += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        // build username
        username = alias + '-' + randomCode;
        return username;
    }
    /**
     * consoleLog
     * @description - generic console log
     * @use - this.consoleLog('AtomDetailsBox is actived');
     * @function
     * @param {string} message - console log message
     * @param {any} value - values or object to show on console.log
     * @return {void}
     */
    consoleLog(message, value = '') {
        if (appConfig.DEBUG) {
            logger_1.logger.warn(message);
        }
    }
    /**
     * emptyStringsToNull
     * @description - Parse empty string to null
     * @use - this.emptyStringsToNull('');
     * @function
     * @param {any} value - Value to validated if is empty
     * @return {any} Value parsed to null (if it contains empty value)
     */
    emptyStringsToNull(value) {
        if (typeof value === 'string') {
            if (value === '') {
                value = null;
            }
        }
        else if (typeof value === 'object') {
            for (var key in value) {
                if (value[key] === '') {
                    value[key] = null;
                }
            }
        }
        return value;
    }
    /**
     * @desc Validate if a value exists on an Array
     * @function valueExistsInArray
     * @example this.valueExistsInArray(array, 'primary', 'typeColor')
     * @param {Array<any>} array - array to validate
     * @param {any} value - value to use to check if exists in the array
     * @param {string} key - If array has inner objects, this is the key that contain the value
     * @return {boolean} value exists in array (true or false)
     */
    valueExistsInArray(array, value, key = null) {
        let res = false;
        if (array.length > 0) {
            let newArray = array.filter((elem) => {
                if (key) {
                    return elem[key] === value;
                }
                else {
                    return elem === value;
                }
            });
            if (newArray.length > 0) {
                res = true;
            }
        }
        return res;
    }
}
/* Export FunctionUtils instance */
exports.functionsUtil = new FunctionsUtil();
//# sourceMappingURL=functionsUtil.js.map