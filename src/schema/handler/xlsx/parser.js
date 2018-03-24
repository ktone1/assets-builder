'use strict';
const Workbook = require('./workbook');


module.exports = class Parser {
    /**
     * @param {string} xlsxBaseDir 
     */
    constructor(xlsxBaseDir) {
        this.xlsxBaseDir = xlsxBaseDir;
        this._workbooks = {};
    }

    /**
     * @param {string} xlsxName 
     * @returns {Workbook}
     */
    getWorkbook(xlsxName) {
        if (this._workbooks[xlsxName] == undefined) {
            this._workbooks[xlsxName] = new Workbook(
                this,
                xlsxName,
            );
        }
        return this._workbooks[xlsxName];
    }
}
