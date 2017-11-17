/************************************/
/*           DEPENDENCIES           */
/************************************/
import * as appConfig from './../constants/app.constants';


/************************************/
/*            INTERFACES            */
/************************************/    
interface IFunctionUtil {
    normalizeString: (str: string) => string;
    generateUsername: (firstName: string, lastName: string) => string;
}


/************************************/
/*         CLASS DEFINITION         */
/************************************/
class FunctionsUtil implements IFunctionUtil {

    constructor() {/**/}


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

    normalizeString(str: string): string {
        // VARIABLES
        let from = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
        let to = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
        let mapping: any = {};

        for (let i = 0; i < from.length; i++ ) {
            mapping[ from.charAt(i) ] = to.charAt(i);
        }

        var ret = [];
        for ( let i = 0; i < str.length; i++ ) {
            let c = str.charAt(i);
            if (mapping.hasOwnProperty(str.charAt(i))) {
                ret.push(mapping[c]);
            } else {
                ret.push(c);
            }
        }

        return ret.join( '' );

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

    generateUsername(firstName: string, lastName: string): string {
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

}


/* Export FunctionUtils instance */
export const functionsUtil = new FunctionsUtil();