/***************************************/
/*            DEPENDENCIES             */
/***************************************/
import * as base64 from 'base-64';


/***************************************/
/*          PAGINATION CLASS           */
/***************************************/
class Pagination {
    // private _env: string;


    /*       CONSTRUCTOR      */
    /**************************/
    constructor() {
        // this._env = process.env.NODE_ENV || 'local';
    }


    /*       METHODS       */
    /***********************/
    
    decodeCursor(cursor: string): Array<any> {
        return cursor ? JSON.parse(base64.decode(cursor)) : null;
    }
    
    encodeCursor(cursor: Array<any>): string {
        return base64.encode(JSON.stringify(cursor));
    }

    getPaginationQuery(
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