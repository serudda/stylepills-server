"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***************************************/
/*            DEPENDENCIES             */
/***************************************/
const base64 = require("base-64");
const appConfig = require("./../../core/constants/app.constants");
/***************************************/
/*          PAGINATION CLASS           */
/***************************************/
class Pagination {
    /*       CONSTRUCTOR      */
    /**************************/
    constructor({ before, after, desc, limit, sortBy = appConfig.ATOM_SEARCH_ORDER_BY_DEFAULT, primaryKey = 'id' }) {
        // Init properties
        this.before = before;
        this.after = after;
        this.desc = desc;
        this.limit = limit;
        // this.primaryKeyField = 'created_at';
        // this.paginationField = 'created_at';
        this.paginationField = sortBy;
        this.primaryKeyField = primaryKey;
        this.paginationFieldIsNonId = this.paginationField !== this.primaryKeyField;
    }
    /*       METHODS       */
    /***********************/
    get Before() {
        return this.before;
    }
    set Before(before) {
        if (before === undefined) {
            throw 'Please supply a *before* value';
        }
        this.before = before;
    }
    get After() {
        return this.after;
    }
    set After(after) {
        if (after === undefined) {
            throw 'Please supply a *after* value';
        }
        this.after = after;
    }
    get Desc() {
        return this.desc;
    }
    set Desc(desc) {
        if (desc === undefined) {
            throw 'Please supply a *desc* value';
        }
        this.desc = desc;
    }
    get Limit() {
        return this.limit;
    }
    set Limit(limit) {
        if (limit === undefined) {
            throw 'Please supply a *limit* value';
        }
        this.limit = limit;
    }
    get PaginationField() {
        return this.paginationField;
    }
    set PaginationField(paginationField) {
        if (paginationField === undefined) {
            throw 'Please supply a *paginationField* value';
        }
        this.paginationField = paginationField;
    }
    get PrimaryKeyField() {
        return this.primaryKeyField;
    }
    set PrimaryKeyField(primaryKeyField) {
        if (primaryKeyField === undefined) {
            throw 'Please supply a *primaryKeyField* value';
        }
        this.primaryKeyField = primaryKeyField;
    }
    get PaginationFieldIsNonId() {
        return this.paginationFieldIsNonId;
    }
    set PaginationFieldIsNonId(paginationFieldIsNonId) {
        if (paginationFieldIsNonId === undefined) {
            throw 'Please supply a *paginationFieldIsNonId* value';
        }
        this.paginationFieldIsNonId = paginationFieldIsNonId;
    }
    /**
     * @desc Decode a cursor formatted in Base64 structure
     * @method Method decodeCursor
     * @public
     * @param {string} cursor cursor to decode
     * @returns {Array<any>} Array of cursors: e.g. [<id>, <likes>] - [1,934]
     */
    decodeCursor(cursor) {
        return cursor ? JSON.parse(base64.decode(cursor)) : null;
    }
    /**
     * @desc Encode a cursor list options (id, likes, recent, etc) to base64 format
     * @method Method encodeCursor
     * @public
     * @param {Array<any>} cursor Array of cursors: e.g. [<id>, <likes>] - [1,934]
     * @returns {string} cursors coded e.g. "WzEsMjM5XQ=="
     */
    encodeCursor(cursor) {
        return base64.encode(JSON.stringify(cursor));
    }
    /**
     * @desc Build the pagination query (where) and order
     * @method Method buildPaginationQuery
     * @public
     * @returns {Object, Array} paginationQuery, order
     */
    buildPaginationQuery() {
        const decodedBefore = !!this.before ? this.decodeCursor(this.before) : null;
        const decodedAfter = !!this.after ? this.decodeCursor(this.after) : null;
        // If is before (previous) = FALSE, if not TRUE
        const cursorOrderIsDesc = this.before ? !this.desc : this.desc;
        const cursorOrderOperator = cursorOrderIsDesc ? '$lt' : '$gt';
        // VARIABLES
        let paginationQuery;
        let order = [
            cursorOrderIsDesc ? [this.paginationField, 'DESC'] : this.paginationField,
            ...(this.paginationFieldIsNonId ? [this.primaryKeyField] : []),
        ];
        if (this.before) {
            paginationQuery = this._getPaginationOperator(decodedBefore, cursorOrderOperator);
            /* FIXME: #67 - Rompe cuando paginationFieldIsNonId es false, es decir
                cuando quiero organizar por 'created_at' */
            order = [
                this.paginationField,
                // ...(paginationFieldIsNonId ? [primaryKeyField, 'DESC'] : []),
                this.paginationFieldIsNonId ? [this.primaryKeyField, 'DESC'] : '',
            ];
        }
        else if (this.after) {
            paginationQuery = this._getPaginationOperator(decodedAfter, cursorOrderOperator);
            order = [
                cursorOrderIsDesc ? [this.paginationField, 'DESC'] : this.paginationField,
                ...(this.paginationFieldIsNonId ? [this.primaryKeyField] : []),
            ];
        }
        return { paginationQuery, order };
    }
    /**
     * @desc Build Cursors
     * @method Method buildCursors
     * @public
     * @param {Array<any>} results Data results
     * @return {ICursorsResult} Cursors section on response returned to client
     */
    buildCursors(results) {
        const hasMore = results.length > this.limit;
        const hasNext = !!this.before || hasMore;
        const hasPrevious = !!this.after || (!!this.before && hasMore);
        let beforeCursor = null;
        let afterCursor = null;
        if (hasMore) {
            results.pop();
        }
        if (this.before) {
            results.reverse();
        }
        if (results.length > 0) {
            beforeCursor = this.paginationFieldIsNonId
                ? this.encodeCursor([results[0][this.paginationField], results[0][this.primaryKeyField]])
                : this.encodeCursor([results[0][this.paginationField]]);
            afterCursor = this.paginationFieldIsNonId
                // tslint:disable-next-line:max-line-length
                ? this.encodeCursor([results[results.length - 1][this.paginationField], results[results.length - 1][this.primaryKeyField]])
                : this.encodeCursor([results[results.length - 1][this.paginationField]]);
        }
        return {
            hasNext,
            hasPrevious,
            before: beforeCursor,
            after: afterCursor,
        };
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
    _getPaginationOperator(cursor, cursorOrderOperator) {
        const primaryCursorOrderOperator = cursorOrderOperator === '$gt' ? '$lt' : '$gt';
        if (this.paginationField !== this.primaryKeyField) {
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
                        [this.paginationField]: {
                            [cursorOrderOperator]: cursor[0],
                        },
                    },
                    {
                        // AFTER: "stores" = 100
                        // BEFORE: "likes" = 12389
                        [this.paginationField]: cursor[0],
                        // AFTER: "id" > 7
                        // BEFORE: "id" < 4
                        [this.primaryKeyField]: {
                            [primaryCursorOrderOperator]: cursor[1],
                        },
                    },
                ],
            };
        }
        else {
            return {
                // AFTER: "store" < 100
                // BEFORE: "likes" > 12389
                [this.paginationField]: {
                    [cursorOrderOperator]: cursor[0],
                },
            };
        }
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map