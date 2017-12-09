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
    extend(origin, add) {
        // Don't do anything if add isn't an object
        if (!add || typeof add !== 'object') {
            return origin;
        }
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
            origin[keys[i]] = add[keys[i]];
        }
        return origin;
    }
}
/* Export FunctionUtils instance */
exports.functionsUtil = new FunctionsUtil();
//# sourceMappingURL=functionsUtil.js.map