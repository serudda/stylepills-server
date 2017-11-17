/***************************************/
/*            DEPENDENCIES             */
/***************************************/
import * as base64 from 'base-64';


/***************************************/
/*          PAGINATION CLASS           */
/***************************************/
class Pagination {


    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {/**/}


    
    /*       METHODS       */
    /***********************/
    

    /**
     * @desc Decode a cursor formatted in Base64 structure
     * @method Method decodeCursor
     * @public
     * @param {string} cursor cursor to decode
     * @returns {Array<any>} Array of cursors: e.g. [<id>, <likes>] - [1,934]
     */
    decodeCursor(cursor: string): Array<any> {
        return cursor ? JSON.parse(base64.decode(cursor)) : null;
    }
    

    /**
     * @desc Encode a cursor list options (id, likes, recent, etc) to base64 format
     * @method Method encodeCursor
     * @public
     * @param {Array<any>} cursor Array of cursors: e.g. [<id>, <likes>] - [1,934]
     * @returns {string} cursors coded e.g. "WzEsMjM5XQ=="
     */
    encodeCursor(cursor: Array<any>): string {
        return base64.encode(JSON.stringify(cursor));
    }

    
    /**
     * @desc Build the pagination query (where) and order
     * @method Method buildPaginationQuery
     * @public
     * @param {string} before cursor coded (Previous page on pagination)
     * @param {string} after cursor coded (Next page on pagination)
     * @param {boolean} desc Is it in desc order?
     * @param {string} paginationField field on model to use by pagination (e.g. "likes", "stores")
     * @param {string} primaryKeyField primary key field (e.g. "Id")
     * @param {boolean} paginationFieldIsNonId Pagination Field is non Id?
     * @returns {Object, Array} paginationQuery, order 
     */
    buildPaginationQuery(
        before: string, 
        after: string, 
        desc: boolean, 
        paginationField: string,
        primaryKeyField: string,
        paginationFieldIsNonId: boolean
    ) {

        const decodedBefore = !!before ? this.decodeCursor(before) : null;
        const decodedAfter = !!after ? this.decodeCursor(after) : null;
        // If is before (previous) = FALSE, if not TRUE
        const cursorOrderIsDesc = before ? !desc : desc;
        const cursorOrderOperator = cursorOrderIsDesc ? '$lt' : '$gt';    

        // VARIABLES
        let paginationQuery;
        let order: Array<any> = [
            cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
            ...(paginationFieldIsNonId ? [primaryKeyField] : []),
        ];

        if (before) {
            
            paginationQuery = this._getPaginationOperator(
                decodedBefore, 
                cursorOrderOperator, 
                paginationField, 
                primaryKeyField
            );

            /* FIXME: #67 - Rompe cuando paginationFieldIsNonId es false, es decir 
                cuando quiero organizar por 'created_at' */
            order = [
                paginationField,
                // ...(paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : []),
                paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : '',
            ];

        } else if (after) {

            paginationQuery = this._getPaginationOperator(
                decodedAfter, 
                cursorOrderOperator, 
                paginationField, 
                primaryKeyField
            );

            order = [
                cursorOrderIsDesc ? [paginationField, 'DESC'] : paginationField,
                ...(paginationFieldIsNonId ? [primaryKeyField] : []),
            ];

        }

        return {paginationQuery, order};
    }


    /**
     * @desc Get pagination operator ($or, $and)
     * @method Method _getPaginationOperator
     * @private
     * @param {Array<any>} cursor Array of cursors: e.g. [<id>, <likes>] - [1,934]
     * @param {string} cursorOrderOperator less than ($lt) or greater than ($gt)
     * @param {string} paginationField field on model to use by pagination (e.g. "likes", "stores")
     * @param {string} primaryKeyField primary key field (e.g. "Id")
     */
    private _getPaginationOperator(
        cursor: Array<any>, 
        cursorOrderOperator: string, 
        paginationField: string,
        primaryKeyField: string) {
        
        const primaryCursorOrderOperator = cursorOrderOperator === '$gt' ? '$lt' : '$gt';
    
        if (paginationField !== primaryKeyField) {
            /* 
                AFTER: 
                ("stores" < 100 OR ("stores" = 100 AND "id" > 7)
                cursorOrderOperator = $lt (<)
    
                BEFORE: 
                ("likes" > 12389 OR ("likes" = 12389 AND "id" < 4)
                cursorOrderOperator = $gt (>)
            */
            return {
                $or: [
                    {
                        // AFTER: "store" < 100
                        // BEFORE: "likes" > 12389
                        [paginationField]: {
                            [cursorOrderOperator]: cursor[0],
                        },
                    },
                    {
                        // AFTER: "stores" = 100
                        // BEFORE: "likes" = 12389
                        [paginationField]: cursor[0],
                        // AFTER: "id" > 7
                        // BEFORE: "id" < 4
                        [primaryKeyField]: {
                            [primaryCursorOrderOperator]: cursor[1],
                        },
                    },
                ],
            };
        } else {
            return {
                // AFTER: "store" < 100
                // BEFORE: "likes" > 12389
                [paginationField]: {
                    [cursorOrderOperator]: cursor[0],
                },
            };
        }
    }

}


/* Export Pagination instance */
export const pagination = new Pagination();